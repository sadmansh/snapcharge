const passport = require('passport')
const router = require('express').Router()

router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res, next) {
	res.send({ msg: 'This is a protected dashboard route.' })
})

module.exports = router