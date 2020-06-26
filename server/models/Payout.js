const mongoose = require('mongoose')
const { Schema } = mongoose

const PayoutSchema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	currencyTo: {
		type: String,
		required: false
	},
	exchangeRate: {
		type: Number,
		required: false
	},
	status: {
		type: String,
		required: true,
		default: 'processing'
	},
	stripeFees: {
		type: Number,
		required: false
	},
	fees: {
		type: Number,
		required: false
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
})

PayoutSchema.pre('save', function(next) {
	const payout = this
	let stripeFees = (payout.subtotal * 0.029) + 30
	let fees = payout.subtotal * 0.01
	payout.stripeFees = stripeFees
	payout.fees = fees
	next()
})

mongoose.model('payouts', PayoutSchema)