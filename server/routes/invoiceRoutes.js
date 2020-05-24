const passport = require('passport')
const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require('mongoose')
const Invoice = mongoose.model('invoices')

router.post('/invoices/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const stripeId = req.body.customer.stripeId
		const invoiceItems = req.body.invoiceItems
		const currency = req.body.customer.currency
		for (const item of invoiceItems) {
			const invoiceItem = await stripe.invoiceItems.create({
				customer: stripeId,
				amount: item.amount,
				description: item.description,
				currency: currency
			})
		}
	
		const invoice = await stripe.invoices.create({
			customer: stripeId,
			collection_method: req.body.collectionMethod,
			days_until_due: req.body.daysUntilDue,
			auto_advance: true,
			metadata: {
				user: req.user.id
			},
		})

		if (invoice) {
			const existingInvoice = await Invoice.findOne({ stripeId: invoice.id })
			if (existingInvoice) return res.status(200).send({ error: 'Invoice already exists.' })
			const newInvoice = await new Invoice({
				stripeId: invoice.id,
				customer: {
					id: req.body.customer.id,
					stripeId: invoice.customer,
					name: invoice.customer_name,
					email: invoice.customer_email
				},
				_user: req.user.id,
				created: invoice.created,
				currency: invoice.currency,
				collectionMethod: invoice.collection_method,
				lines: invoice.lines.data,
				status: invoice.status,
				subtotal: invoice.subtotal,
				total: invoice.total
			}).save()
			res.send(newInvoice)
		}
	} catch (error) {
		console.log(error)
		res.status(200).send({ error: error.message })
	}
})

router.get('/invoices', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const invoices = await Invoice.find({ _user: req.user.id })
		res.send(invoices.reverse())
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

module.exports = router