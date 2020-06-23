const passport = require('passport')
const router = require('express').Router()
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require('mongoose')
const Payment = mongoose.model('payments')

router.get('/payments/aggregate', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const totals = await Payment.aggregate([
		{
			$match: {
				_user: req.user._id,
				status: 'unpaid'
			}
		},
		{
			$group: {
				_id: null,
				unpaid: {
					$sum: '$subtotal'
				} 
			}
		}
		])
		res.send(totals)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

module.exports = router