const passport = require('passport')
const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require('mongoose')
const Payment = mongoose.model('payments')

router.get('/payments/:invoiceId', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const payment = await Payment.findOne({ _invoice: req.params.invoiceId })
		res.send(payment)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

module.exports = router