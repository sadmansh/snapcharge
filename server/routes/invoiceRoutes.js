const passport = require('passport')
const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require('mongoose')
const Invoice = mongoose.model('invoices')

router.post('/invoices/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
	console.log(`Attempting to create invoice for user ${req.user.id}`)
	try {
		const stripeId = req.body.customer.stripeId
		const invoiceItems = req.body.invoiceItems
		const currency = req.user.currency
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
				user: req.user.id,
				customer: req.body.customer.id
			},
		})

		if (invoice) {
			console.log(`Created Stripe invoice object ${invoice.id} for user ${req.user.id}`)
			const existingInvoice = await Invoice.findOne({ stripeId: invoice.id })
			if (existingInvoice) return res.status(200).send({ error: 'Invoice already exists.' })
			const newInvoice = await new Invoice({
				stripeId: invoice.id,
				_customer: req.body.customer.id,
				_user: req.user.id,
				created: invoice.created,
				currency: invoice.currency,
				dueDate: invoice.due_date,
				number: invoice.number,
				collectionMethod: invoice.collection_method,
				lines: invoice.lines.data,
				status: invoice.status,
				subtotal: invoice.subtotal,
				total: invoice.total
			}).save()
			const updateInvoiceMeta = await stripe.invoices.update(invoice.id, { metadata: { invoice: newInvoice.id } })
			console.log(`Created invoice ${newInvoice.id} for user ${req.user.id}`)
			res.send(newInvoice)
		}
	} catch (error) {
		console.log(error)
		res.status(200).send({ error: error.message })
	}
})

router.get('/invoices', passport.authenticate('jwt', { session: false }), async (req, res) => {
	console.log(`Attempting to fetch all invoices for user ${req.user.id}`)
	try {
		const invoices = await Invoice.find({ _user: req.user.id })
		res.send(invoices.reverse())
		console.log(`Sent all invoices for user ${req.user.id}`)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

router.get('/invoices/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	console.log(`Attempting to fetch invoice ${req.params.id} for user ${req.user.id}`)
	try {
		const invoice = await Invoice.findById(req.params.id)
		res.send(invoice)
		console.log(`Sent invoice ${req.params.id} for user ${req.user.id}`)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

module.exports = router