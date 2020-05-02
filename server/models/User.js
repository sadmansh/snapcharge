const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		index: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	emailVerified: {
		type: Boolean,
		default: false
	},
	superUser: {
		type: Boolean,
		required: false,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	password: {
		type: String,
		required: true
	}
})

UserSchema.pre('save', function(next) {
	const user = this
	if (user.password && (user.isModified('password') || user.isNew)) {
		user.password = hashPassword(user.password)
	}
	next()
})

UserSchema.methods.comparePassword = function(password) {
	if (!this.password) return false
	return bcrypt.compareSync(password, this.password)
}

const hashPassword = password => {
	const salt = bcrypt.genSaltSync()
	const hash = bcrypt.hashSync(password, salt)
	return hash
}

mongoose.model('users', UserSchema)