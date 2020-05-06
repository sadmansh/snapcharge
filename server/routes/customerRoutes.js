const passport = require('passport')
const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require('mongoose')
const Customer = mongoose.model('customers')

router.post('/customers/create', passport.authenticate('jwt', { session: false }), async (req, res) => {

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
				try {
					const newCustomer = await new Customer({
						stripeId: customer.id,
						_user: req.user.id,
						name: customer.name,
						email: customer.email,
						created: customer.created,
						currency: customer.currency
					}).save()
					res.send(newCustomer)
				} catch (error) {
					return res.status(200).send({ error: error.message })
				}
			}
		} else {
			return res.status(200).send({ error: 'Customer already exists.' })
		}
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

router.get('/customers', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const customers = await Customer.find({ _user: req.user.id })
		res.send(customers)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

module.exports = router