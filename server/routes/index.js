const authRoutes = require('./authRoutes')

module.exports = app => {
	app.use('/api', authRoutes)
}