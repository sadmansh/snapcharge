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
			$group: {
				_id: '$status',
				total: { $sum: { $cond: [ { $eq: ['$status', 'paidout'] }, '$total', '$subtotal' ] } },
				latest: { $last: { $cond: [{ $eq: ['$status', 'paidout'] }, '$$ROOT', '$$REMOVE' ] } }
			}
		},
		{ $addFields: { latest: { $ifNull: ['$latest', '$$REMOVE' ] } } }
		])
		const data = {}
		totals.map((item, index) => {
			if (['unpaid', 'received', 'paidout'].includes(item._id)) data[item._id] = item.total
			if (item._id === 'paidout') data.latest = item.latest
		})
		res.send(data)
	} catch (error) {
		console.error(error)
		res.status(200).send({ error: error.message })
	}
})

module.exports = router