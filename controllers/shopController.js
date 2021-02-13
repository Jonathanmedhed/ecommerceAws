const asyncHandler = require('express-async-handler')
const Shop = require('../models/shopModel')

// @desc    Create a shop
// @route   POST /api/shop
// @access  Private/Admin
exports.createShop = asyncHandler(async (req, res) => {
	const shops = await Shop.find({})

	if (shops && shops.length > 0) {
		res.status(400)
		throw new Error('Tienda ya creada')
	} else {
		const shop = await Shop.create({
			address: '',
			city: '',
			postalCode: '',
			country: '',
			email: 'test@example.com',
			facebook: '',
			image: '',
			instagram: '',
			message: '',
			mobile: '',
			name: '',
			phone: '',
			title: '',
			twitter: '',
			lat: 0,
			lng: 0,
			dollarValue: 0,
			waitTime: 0,
			waitTimeDelivery: 0,
			taxPercentage: 0,
			includeTax: false,
			mobileBank: '',
			mobilePhone: '',
			mobileID: '',
			logo: '',
			openingTimes: [],
			sections: [],
			shipmentCost: 0,
			shipmentLimit: 0,
			externalLink: '',
			deliveryRules: [],
		})

		if (shop) {
			res.status(201).json('Tienda creada')
		} else {
			res.status(400)
			throw new Error('Creacion a fallado')
		}
	}
})

// @desc    Get shop info
// @route   GET /api/shop
// @access  Public
exports.getShopInfo = asyncHandler(async (req, res) => {
	const shops = await Shop.find({})
	if (shops && shops.length > 0) {
		res.json({
			address: shops[0].address,
			city: shops[0].city,
			postalCode: shops[0].postalCode,
			country: shops[0].country,
			email: shops[0].email,
			facebook: shops[0].facebook,
			image: shops[0].image,
			instagram: shops[0].instagram,
			message: shops[0].message,
			mobile: shops[0].mobile,
			name: shops[0].name,
			phone: shops[0].phone,
			title: shops[0].title,
			twitter: shops[0].twitter,
			lat: shops[0].lat,
			lng: shops[0].lng,
			dollarValue: shops[0].dollarValue,
			waitTime: shops[0].waitTime,
			waitTimeDelivery: shops[0].waitTimeDelivery,
			taxPercentage: shops[0].taxPercentage,
			includeTax: shops[0].includeTax,
			mobileBank: shops[0].mobileBank,
			mobilePhone: shops[0].mobilePhone,
			mobileID: shops[0].mobileID,
			logo: shops[0].logo,
			openingTimes: shops[0].openingTimes,
			sections: shops[0].sections,
			shipmentCost: shops[0].shipmentCost,
			shipmentLimit: shops[0].shipmentLimit,
			externalLink: shops[0].externalLink,
			deliveryRules: shops[0].deliveryRules,
		})
	} else {
		res.status(404)
		throw new Error('Tienda no encontrada')
	}
})

// @desc    Update shop info
// @route   PUT /api/shop
// @access  Private/Admin
exports.updateShopInfo = asyncHandler(async (req, res) => {
	const shops = await Shop.find({})
	if (shops && shops.length > 0) {
		shops[0].address = req.body.address || shops[0].address
		shops[0].city = req.body.city || shops[0].city
		shops[0].postalCode = req.body.postalCode || shops[0].postalCode
		shops[0].country = req.body.country || shops[0].country
		shops[0].email = req.body.email || shops[0].email
		shops[0].facebook = req.body.facebook ? req.body.facebook : ''
		shops[0].image = req.body.image || shops[0].image
		shops[0].instagram = req.body.instagram ? req.body.instagram : ''
		shops[0].message = req.body.message || shops[0].message
		shops[0].mobile = req.body.mobile ? req.body.mobile : ''
		shops[0].name = req.body.name || shops[0].name
		shops[0].phone = req.body.phone ? req.body.phone : ''
		shops[0].title = req.body.title || shops[0].title
		shops[0].twitter = req.body.twitter ? req.body.twitter : ''
		shops[0].lat = req.body.lat || shops[0].lat
		shops[0].lng = req.body.lng || shops[0].lng
		shops[0].dollarValue = req.body.dollarValue || shops[0].dollarValue
		shops[0].waitTime = req.body.waitTime || shops[0].waitTime
		shops[0].waitTimeDelivery = req.body.waitTimeDelivery || shops[0].waitTimeDelivery
		shops[0].taxPercentage = req.body.taxPercentage || shops[0].taxPercentage
		shops[0].includeTax = req.body.includeTax || shops[0].includeTax
		shops[0].mobileBank = req.body.mobileBank || shops[0].mobileBank
		shops[0].mobilePhone = req.body.mobilePhone || shops[0].mobilePhone
		shops[0].mobileID = req.body.mobileID || shops[0].mobileID
		shops[0].logo = req.body.logo || shops[0].logo
		shops[0].openingTimes = req.body.openingTimes || shops[0].openingTimes
		shops[0].sections = req.body.sections || shops[0].sections
		shops[0].shipmentCost = req.body.shipmentCost || shops[0].shipmentCost
		shops[0].shipmentLimit = req.body.shipmentLimit || shops[0].shipmentLimit
		shops[0].externalLink = req.body.externalLink || shops[0].externalLink
		shops[0].deliveryRules = req.body.deliveryRules || shops[0].deliveryRules

		const updatedShop = await shops[0].save()

		res.json({
			address: updatedShop.address,
			city: updatedShop.city,
			postalCode: updatedShop.postalCode,
			country: updatedShop.country,
			email: updatedShop.email,
			facebook: updatedShop.facebook,
			image: updatedShop.image,
			instagram: updatedShop.instagram,
			message: updatedShop.message,
			mobile: updatedShop.mobile,
			name: updatedShop.name,
			phone: updatedShop.phone,
			title: updatedShop.title,
			twitter: updatedShop.twitter,
			lat: updatedShop.lat,
			lng: updatedShop.lng,
			dollarValue: updatedShop.dollarValue,
			waitTime: updatedShop.waitTime,
			waitTimeDelivery: updatedShop.waitTimeDelivery,
			taxPercentage: updatedShop.taxPercentage,
			includeTax: updatedShop.includeTax,
			mobileBank: updatedShop.mobileBank,
			mobilePhone: updatedShop.mobilePhone,
			mobileID: updatedShop.mobileID,
			logo: updatedShop.logo,
			openingTimes: updatedShop.openingTimes,
			sections: updatedShop.sections,
			shipmentCost: updatedShop.shipmentCost,
			shipmentLimit: updatedShop.shipmentLimit,
			externalLink: updatedShop.externalLink,
			deliveryRules: updatedShop.deliveryRules,
		})
	} else {
		res.status(404)
		throw new Error('Tienda no encontrada')
	}
})

// @desc    Delete shop
// @route   DELETE /api/shop/
// @access  Private/Admin
exports.deleteShop = asyncHandler(async (req, res) => {
	const shops = await Shop.find({})

	if (shops && shops.length > 0) {
		await shops[0].remove()
		res.json({ message: 'Tienda borrada' })
	} else {
		res.status(404)
		throw new Error('Tienda no encontrada')
	}
})
