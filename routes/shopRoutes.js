import express from 'express'
const router = express.Router()
import { createShop, getShopInfo, updateShopInfo, deleteShop } from '../controllers/shopController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
	.route('/')
	.post(protect, admin, createShop)
	.get(getShopInfo)
	.delete(protect, admin, deleteShop)
	.put(protect, admin, updateShopInfo)

export default router
