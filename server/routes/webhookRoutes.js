const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Invoice = mongoose.model('invoices')
const Customer = mongoose.model('customers')
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

			// Update user balance
			await User.updateOne({
				_id: req.user.id
			}, {
				$inc: { balance: invoice.total }
			}, (error, res) => {
				if (error) console.error(error)
				else console.log(`Updated user balance for user ID ${req.user._id}`)
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