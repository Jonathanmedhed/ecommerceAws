import express from 'express'
const router = express.Router()
import {
	addOrderItems,
	getOrderById,
	updateOrderToApproved,
	updateOrderToPaid,
	updateOrderToDelivered,
	updateOrderToCanceled,
	getMyOrders,
	getOrders,
	updateOrderToChecked,
	addOrderItemsGuest,
	getOrderByIdGuest,
	updateOrderToPaidGuest,
	updateOrderDollar,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/guest').post(addOrderItemsGuest)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/guest').get(getOrderByIdGuest)
router.route('/:id/approve').put(protect, updateOrderToApproved)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/pay/guest').put(updateOrderToPaidGuest)
router.route('/:id/dollar').put(updateOrderDollar)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/cancel').put(protect, admin, updateOrderToCanceled)
router.route('/:id/check').put(protect, admin, updateOrderToChecked)

export default router
