const passport = require('passport')
const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require('mongoose')
const Invoice = mongoose.model('invoices')
const Customer = mongoose.model('customers')

router.post('/invoices/create', async (req, res) => {
	try {
		const customer = await Customer.findById(req.body.customerId)
		if (customer) {
			const stripeId = customer.stripeId
			const invoiceItems = req.body.invoiceItems
			for (const item of invoiceItems) {
				const invoiceItem = await stripe.invoiceItems.create({
					customer: stripeId,
					amount: item.amount,
					currency: item.currency,
					description: item.description
				})
			}
		}
		
		if (invoiceItem) {
			console.log(stripeId)
			const invoice = await stripe.invoices.create({
				customer: stripeId,
				auto_advance: false,
				collection_method: 'send_invoice',
				due_date: dueDate,
				metadata: {
					user: req.user.id
				},
			})
			if (invoice) {
				try {
					const existingInvoice = await Customer.findOne({ stripeId: invoice.id })
					if (existingInvoice) return res.status(200).send({ error: 'Invoice already exists.' })
					const newInvoice = await new Invoice({
						stripeId: invoice.id,
						customer: invoice.customer,
						_user: req.user.id,
						created: invoice.created,
						currency: invoice.currency
					}).save()
					res.send(newInvoice)
				} catch (error) {
					return res.status(200).send({ error: error.message })
				}
			}
		}
	} catch (error) {
		console.log(error.message)
		res.status(200).send({ error: error.message })
	}
})

module.exports = router