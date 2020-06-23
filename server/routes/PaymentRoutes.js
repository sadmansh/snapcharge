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
			}
		},
		{
			$group: {
				_id: '$status',
				total: {
					$sum: '$subtotal'
				},
				paidout: {
					$sum: '$total'
				}
			}
		}
		])
		const data = {}
		totals.map((record, index) => {
			if (record._id === 'paidout') data[totals[index]._id] = totals[index].paidout
			data[totals[index]._id] = totals[index].total
		})
		res.send(data)
	} catch (error) {
		res.status(200).send({ error: error.message })
	}
})

module.exports = router