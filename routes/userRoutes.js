const express = require('express')
const router = express.Router()
const {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
	forgotPassword,
	resetPassword,
	preSignup,
	googleLogin,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.put('/forgot-password', forgotPassword)
router.put('/reset-password', resetPassword)
router.route('/pre-signup').post(preSignup)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)
// google login
router.post('/google-login', googleLogin)

module.exports = router
