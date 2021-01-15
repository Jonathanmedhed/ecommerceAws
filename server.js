const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const emailRoutes = require('./routes/emailRoutes')
require('dotenv').config()
// app
const app = express()
// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
// cors
// cors
if (process.env.NODE_ENV === 'development') {
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}
// routes
app.use('/api/email', emailRoutes)
// port
const port = process.env.PORT || 8000
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
