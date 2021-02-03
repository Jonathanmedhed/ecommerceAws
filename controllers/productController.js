const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
	const pageSize = 6
	const page = Number(req.query.pageNumber) || 1

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}

	const allProducts = await Product.find({})

	const count = await Product.countDocuments({ ...keyword })

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({ allProducts, products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
	try {
		const {
			name,
			price,
			description,
			images,
			brand,
			category,
			countInStock,
			specs,
			discount,
			deal,
			sections,
			externalLink,
			shippingCost,
			unitShippingCost,
		} = req.body

		const productExists = await Product.findOne({ name })

		if (productExists) {
			res.status(400)
			throw new Error('Nombre en uso')
		}

		const product = await Product.create({
			user: req.user._id,
			name,
			price,
			description,
			images,
			brand,
			category,
			countInStock,
			specs,
			discount,
			deal,
			sections,
			externalLink,
			shippingCost,
			unitShippingCost,
		})

		if (product) {
			res.status(201).json(product)
		} else {
			res.status(400)
			throw new Error('Informacion de producto invalida')
		}
	} catch (error) {
		console.log(error)
	}
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		images,
		brand,
		category,
		countInStock,
		specs,
		discount,
		deal,
		sections,
		externalLink,
		shippingCost,
		unitShippingCost,
	} = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.description = description
		product.images = images
		product.brand = brand
		product.category = category
		product.countInStock = countInStock
		product.specs = specs
		product.discount = discount
		product.deal = deal
		product.sections = sections
		product.externalLink = externalLink
		product.shippingCost = shippingCost
		product.unitShippingCost = unitShippingCost

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Producto no encontrado')
	}
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Ya has calificado a este producto')
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}

		product.reviews.push(review)

		product.numReviews = product.reviews.length

		product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

		await product.save()
		res.status(201).json({ message: 'Calificacion anadida' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(9)

	res.json(products)
})
