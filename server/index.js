const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')


const keys = require('./config/keys')
require('./models/User')
require('./models/Customer')
require('./models/Invoice')
require('./services/passport')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(cors({
	methods: ['POST', 'GET'],
	credentials: true
}))
app.use(morgan('dev'))

app.use((req, res, next) => {
	if (req.originalUrl === '/api/hooks') next()
	else bodyParser.json()(req, res, next)
})
app.use((req, res, next) => {
	if (req.originalUrl === '/api/hooks') next()
	else bodyParser.urlencoded({ extended: true })(req, res, next)
})

app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)