const passport = require('passport')
const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require('mongoose')
const Customer = mongoose.model('customers')

router.post('/customers/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
	console.log(`Attempting to create customer for user ${req.user.id}`)
	try {
		const existingCustomer = await Customer.findOne({ email: req.body.email, _user: req.user.id })
		if (!existingCustomer) {
			const customer = await stripe.customers.create({
				email: req.body.email,
				name: req.body.name,
				metadata: {
					user: req.user.id
				},
			})

			if (customer) {
				console.log(`Created Stripe customer object ${customer.id} for user ${req.user.id}`)
				const newCustomer = await new Customer({
					stripeId: customer.id,
					_user: req.user.id,
					name: customer.name,
					email: customer.email,
					created: customer.created,
				}).save()
				res.send(newCustomer)
			}
		} else {
			console.log(`Customer ${existingCustomer.id} already exists for user ${req.user.id}`)
			return res.status(200).send({ error: 'Customer already exists.' })
		}
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

router.get('/customers', passport.authenticate('jwt', { session: false }), async (req, res) => {
	console.log(`Attempting to fetch all customers for user ${req.user.id}`)
	try {
		const customers = await Customer.find({ _user: req.user.id })
		res.send(customers.reverse())
		console.log(`Sent all customers for user ${req.user.id}`)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

router.get('/customers/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	console.log(`Attempting to fetch customer ${req.params.id} for user ${req.user.id}`)
	try {
		const customer = await Customer.findById(req.params.id)
		res.send(customer)
		console.log(`Sent customer ${req.params.id} for user ${req.user.id}`)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

module.exports = router