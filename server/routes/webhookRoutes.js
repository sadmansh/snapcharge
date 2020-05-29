const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Invoice = mongoose.model('invoices')
const Customer = mongoose.model('customers')
const Payment = mongoose.model('payments')
const User = mongoose.model('users')

router.post('/hooks', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
	const sig = req.headers['stripe-signature']
	const endpointSecret = keys.stripeEndpointSecret
	let event
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
	} catch (error) {
		console.error(`Webhook error: ${error.message}`)
		res.status(400).send(`Webhook error: ${error.message}`)
	}

	switch (event.type) {
		case 'customer.updated': {
			// Update customer currency when an invoice is created
			const customer = event.data.object
			if (customer.currency) {
				await Customer.updateOne({
					stripeId: customer.id,
				}, {
					$set: { currency: customer.currency }
				}, (error, res) => {
					if (error) console.error(error)
					else console.log(`Updated currency for customer ${customer.name}`)
				})
			}
			break
		}
		case 'invoice.sent': {
			const invoice = event.data.object
			// Update invoice status
			await Invoice.updateOne({
				stripeId: invoice.id
			}, {
				$set: { status: invoice.status }
			}, (error, res) => {
				if (error) console.error(error)
				else console.log(`Updated invoice status to "${invoice.status.toUpperCase()}" for invoice ID ${invoice.id}`)
			})

			// Create payment instance
			const existingPayment = await Payment.findOne({ _invoice: invoice.metadata.invoice })
			if (existingPayment) console.error(`Payment ${existingPayment.id} already existings for invoice ${invoice.id}`)
			const payment = await new Payment({
				currency: invoice.currency,
				total: invoice.total,
				_customer: invoice.metadata.customer,
				_user: invoice.metadata.user,
				_invoice: invoice.metadata.invoice
			}).save()
			if (payment) console.log(`Created new payment ${payment.id} for invoice ID ${invoice.id}`)
			break
		}
		case 'invoice.payment_succeeded': {
			const invoice = event.data.object
			// Update invoice status
			await Invoice.updateOne({
				stripeId: invoice.id
			}, {
				$set: { status: invoice.status }
			}, (error, res) => {
				if (error) console.error(error)
				else console.log(`Updated invoice status to "${invoice.status.toUpperCase()}" for invoice ID ${invoice.id}`)
			})

			// Update payment status
			await Payment.updateOne({
				_invoice: invoice.metadata.invoice
			}, {
				$set: { status: 'paid' }
			}, (error, res) => {
				if (error) console.error(error)
				else console.log(`Updated payment status to "PAID" for invoice ID ${invoice.id}`)
			})
			break
		}
		default: {
			return res.status(400).end()
		}
	}
	res.status(200).json({ received: true })
})

module.exports = router