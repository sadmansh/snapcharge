const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const customerRoutes = require('./customerRoutes')
const invoiceRoutes = require('./invoiceRoutes')
const paymentRoutes = require('./paymentRoutes')
const webhookRoutes = require('./webhookRoutes')

module.exports = app => {
	app.use('/api', authRoutes)
	app.use('/api', dashboardRoutes)
	app.use('/api', customerRoutes)
	app.use('/api', invoiceRoutes)
	app.use('/api', paymentRoutes)
	app.use('/api', webhookRoutes)
}