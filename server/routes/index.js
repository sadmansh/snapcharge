const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const customerRoutes = require('./customerRoutes')

module.exports = app => {
	app.use('/api', authRoutes)
	app.use('/api', dashboardRoutes)
	app.use('/api', customerRoutes)
}