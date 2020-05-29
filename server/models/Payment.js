const mongoose = require('mongoose')
const { Schema } = mongoose

const PaymentSchema = new Schema({
	currency: {
		type: String,
		required: false
	},
	status: {
		type: String,
		required: true,
		default: 'open'
	},
	total: {
		type: Number,
		required: true
	},
	stripeFees: {
		type: Number,
		required: true
	},
	fees: {
		type: Number,
		required: true
	},
	totalFees: {
		type: Number,
		required: true
	},
	_customer: {
		type: Schema.Types.ObjectId,
		ref: 'Customer'
	},
	_invoice: {
		type: Schema.Types.ObjectId,
		ref: 'Invoice'
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
})

PaymentSchema.pre('save', function(next) {
	const payment = this
	let stripeFees = (payment.total * 0.029) + 0.3
	let fees = payment.total * 0.01
	payment.stripeFees = stripeFees
	payment.fees = fees
	payment.totalFees = stripeFees + fees
	next()
})

mongoose.model('payments', PaymentSchema)