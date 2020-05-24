const mongoose = require('mongoose')
const { Schema } = mongoose

const InvoiceSchema = new Schema({
	stripeId: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	customer: {
		type: Object,
		required: true
	},
	lines: {
		type: Array,
		required: false
	},
	status: {
		type: String,
		required: false
	},
	created: {
		type: String,
		required: true
	},
	collectionMethod: {
		type: String,
		required: true
	},
	dueDate: {
		type: String,
		required: false
	},
	currency: {
		type: String,
		required: false
	},
	number: {
		type: String,
		required: false,
	},
	subtotal: {
		type: String,
		required: false
	},
	total: {
		type: String,
		required: false
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
})

mongoose.model('invoices', InvoiceSchema)