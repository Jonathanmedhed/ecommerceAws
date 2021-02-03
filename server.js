import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import emailRoutes from './routes/emailRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

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
