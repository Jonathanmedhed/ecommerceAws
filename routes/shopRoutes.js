const express = require('express')
const router = express.Router()
const { createShop, getShopInfo, updateShopInfo, deleteShop } = require('../controllers/shopController')
const { protect, admin } = require('../middleware/authMiddleware')

router
	.route('/')
	.post(protect, admin, createShop)
	.get(getShopInfo)
	.delete(protect, admin, deleteShop)
	.put(protect, admin, updateShopInfo)

module.exports = router
