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
		type: String,
		required: true
	},
	items: {
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
	collection_method: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: false
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

mongoose.model('invoices', InvoiceSchema)