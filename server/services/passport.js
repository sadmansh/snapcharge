const passport = require('passport')
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = mongoose.model('users')
const keys = require('../config/keys')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
})

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
},
	async (email, password, done) => {
		console.log('Hit passport local strategy...')
		try {
			const user = await User.findOne({ email })
			if (user) {
				if (user.comparePassword(password)) {
					return done(null, user)
				} else {
					return done(null, false, { errors: { error: 'Password does not match.' } })
				}
			} else {
				return done(null, false, { errors: { error: 'Email/password combination does not exist.' } })
			}
		} catch(error) {
			return done(null, false, { error })
		}
	}
))

passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: keys.jwtSecret,
},
	async (payload, done) => {
		console.log('Hit passport jwt strategy...')
		try {
			const user = await User.findById(payload.sub)
			if (user) return done(null, user)
			else return done(null, false)
		} catch (error) {
			return done(error, false)
		}
	}
))