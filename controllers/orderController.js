const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const Shop = require('../models/shopModel')
const User = require('../models/userModel')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		totalPriceBs,
		dollarValue,
		totalDiscount,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No hay productos')
	} else {
		// To find order by user name later
		let buyer = null
		if (req.user) {
			buyer = await User.findById(req.user._id)
		}

		const order = new Order({
			orderItems,
			user: req.user && req.user._id ? req.user._id : null,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			totalPriceBs,
			dollarValue,
			totalDiscount,
			buyer: buyer && buyer.name ? buyer.name : null,
		})

		orderItems.forEach(async (item) => {
			const product = await Product.findById(item.product)
			product.countInStock = product.countInStock - item.qty
			await product.save()
		})

		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
	}
})

// @desc    Create new order as a guest
// @route   POST /api/orders/guest
// @access  Private
exports.addOrderItemsGuest = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		totalPriceBs,
		dollarValue,
		totalDiscount,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No hay productos')
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			totalPriceBs,
			dollarValue,
			totalDiscount,
		})

		orderItems.forEach(async (item) => {
			const product = await Product.findById(item.product)
			product.countInStock = product.countInStock - item.qty
			await product.save()
		})

		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
	}
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email')

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Get order by ID as a guest
// @route   GET /api/orders/:id/guest
// @access  Private
exports.getOrderByIdGuest = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Update order to approved
// @route   PUT /api/orders/:id/approve
// @access  Private
exports.updateOrderToApproved = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isApproved = true
		order.approvedAt = Date.now()

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
	if (req.body.paymentReference) {
		const orders = await Order.find({ paymentReference: req.body.paymentReference })

		if (orders.length > 0) {
			res.status(400)
			throw new Error('Referencia ya utilizada')
		}
	}

	const order = await Order.findById(req.params.id)

	if (order) {
		if (req.body.paymentReference) order.isPaid = true
		if (req.body.paymentReference) order.paidAt = Date.now()
		if (req.body.paymentReference) order.paymentReference = req.body.paymentReference
		if (req.body.change) order.change = req.body.change
		if (req.body.isSetAside) order.isSetAside = true
		if (req.body.isPaid) order.isPaid = true
		if (req.body.isPaid) order.paidAt = Date.now()
		if (req.body.guest) order.guest = req.body.guest
		if (req.body.guest) order.buyer = req.body.guest.name
		order.pickupAt = req.body.pickupAt

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Update order to paid as a guest
// @route   PUT /api/orders/:id/pay/guest
// @access  Private
exports.updateOrderToPaidGuest = asyncHandler(async (req, res) => {
	if (req.body.paymentReference) {
		const orders = await Order.find({ paymentReference: req.body.paymentReference })

		if (orders.length > 0) {
			res.status(400)
			throw new Error('Referencia ya utilizada')
		}
	}

	const order = await Order.findById(req.params.id)

	if (order) {
		if (req.body.paymentReference) order.isPaid = true
		if (req.body.paymentReference) order.paidAt = Date.now()
		if (req.body.paymentReference) order.paymentReference = req.body.paymentReference
		if (req.body.change) order.change = req.body.change
		if (req.body.isSetAside) order.isSetAside = true
		if (req.body.isPaid) order.isPaid = true
		if (req.body.isPaid) order.paidAt = Date.now()
		if (req.body.guest) order.guest = req.body.guest
		if (req.body.guest) order.buyer = req.body.guest.name
		order.pickupAt = req.body.pickupAt

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Update order to canceled
// @route   PUT /api/orders/:id/cancel
// @access  Private/Admin
exports.updateOrderToCanceled = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		if (req.body.activate) {
			order.isCanceled = false

			// update product quantity in stock
			order.orderItems.forEach(async (item) => {
				const product = await Product.findById(item.product)
				product.countInStock = product.countInStock - item.qty
				await product.save()
			})
		} else {
			order.isCanceled = true
			order.canceledAt = Date.now()
			order.canceledReason = req.body.canceledReason

			// update product quantity in stock
			order.orderItems.forEach(async (item) => {
				const product = await Product.findById(item.product)
				product.countInStock = product.countInStock + item.qty
				await product.save()
			})
		}

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Update order to checked
// @route   PUT /api/orders/:id/check
// @access  Private/Admin
exports.updateOrderToChecked = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isChecked = true

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Update order dollar value
// @route   PUT /api/orders/:id/dollar
// @access  Public
exports.updateOrderDollar = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	const shops = await Shop.find({})
	if (!shops || (shops && shops.length === 0)) {
		res.status(404)
		throw new Error('Tienda no encontrada')
	}

	if (order) {
		order.dollarValue = shops[0].dollarValue
		order.totalPriceBs = Number(order.totalPrice) * Number(shops[0].dollarValue)

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Orden no encontrada')
	}
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
	res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.json(orders)
})
