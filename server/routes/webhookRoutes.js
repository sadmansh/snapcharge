const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Invoice = mongoose.model('invoices')
const Customer = mongoose.model('customers')

router.post('/hooks', bodyParser.raw({ type: 'application/json' }), (req, res) => {
	const sig = req.headers['stripe-signature']
	const endpointSecret = keys.stripeEndpointSecret
	let event
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
	} catch (error) {
		console.log(`Webhook error: ${error.message}`)
		res.status(400).send(`Webhook error: ${error.message}`)
	}

	switch (event.type) {
		case 'customer.updated':
			console.log('Webhook received for customer.updated')
			break
		default:
			return res.status(400).end()
	}
	res.status(200).json({ received: true })
})

module.exports = router