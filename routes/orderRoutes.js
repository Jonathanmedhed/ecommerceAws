const express = require('express')
const router = express.Router()
const {
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
} = require('../controllers/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

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

module.exports = router
