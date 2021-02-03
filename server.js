const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const emailRoutes = require('./routes/emailRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const shopRoutes = require('./routes/shopRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

dotenv.config()

connectDB()

// app
const app = express()
// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// cors
if (process.env.NODE_ENV === 'development') {
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}
// routes
app.use('/api/email', emailRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/shop', shopRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.get('/api/config/gmap', (req, res) => res.send(process.env.MAPS_KEY))

app.use(notFound)
app.use(errorHandler)

// port
const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
