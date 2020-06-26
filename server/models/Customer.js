const mongoose = require('mongoose')
const { Schema } = mongoose

const CustomerSchema = new Schema({
	stripeId: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		lowecase: true
	},
	created: {
		type: String,
		required: true
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
})

mongoose.model('customers', CustomerSchema)