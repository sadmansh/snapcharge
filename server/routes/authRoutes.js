const passport = require('passport')
const router = require('express').Router()
const mongoose = require('mongoose')
const jwt = require('jwt-simple')

const keys = require('../config/keys')
const User = mongoose.model('users')

router.post('/auth/register', async (req, res, next) => {
	const user = req.body
	if (!user.firstName || !user.lastName) return res.status(422).send({ error: 'Full name is required.' })
	if (!user.email) return res.status(422).send({ error: 'Email address is required.' })
	if (!user.password) return res.status(422).send({ error: 'Password is required.' })
	const existingUser = await User.findOne({ email: user.email })
	if (existingUser) return res.status(422).send({ error: 'User already exists.' })
	try {
		const newUser = await new User(user).save()
		newUser.password = null
		res.json({ token: tokenForUser(newUser), user: newUser })
	} catch (error) {
		return res.status(422).send({ error: error })
	}
	
})

router.post('/auth/login', passport.authenticate('local', { session: true }), (req, res, next) => {
	req.user.password = null
	res.send({ token: tokenForUser(req.user), user: req.user })
})

router.get('/auth/user', (req, res, next) => {
	req.user.password = null
	res.send(req.user)
})

router.get('/user/countries', (req, res) => {
	res.send(require('../utils/Countries'))
})

const tokenForUser = user => {
	const timestamp = new Date().getTime()
	user.password = null
	return jwt.encode({
		sub: user.id,
		iat: timestamp,
		user: user,
	}, keys.jwtSecret)
}

module.exports = router