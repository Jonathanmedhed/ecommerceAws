const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Email o contrasena invalidos')
	}
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
/**
exports.registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, isAdmin } = req.body
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('Usuario ya existe')
	}

	const user = await User.create({
		name,
		email,
		password,
		isAdmin: req.user && req.user.isAdmin ? isAdmin : false,
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Informacion incorrecta')
	}
})
 */
exports.registerUser = asyncHandler(async (req, res) => {
	const token = req.body.token
	if (token) {
		let isValid = true

		jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
			if (err) {
				isValid = false
			}
		})

		if (isValid) {
			const { name, email, password } = jwt.decode(token)

			const userExists = await User.findOne({ email })

			if (userExists) {
				res.status(400)
				throw new Error('Usuario ya existe')
			}

			const user = await User.create({
				name,
				email,
				password,
				isAdmin: false,
			})

			if (user) {
				res.status(201).json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user._id),
				})
			} else {
				res.status(400)
				throw new Error('Informacion incorrecta')
			}
		} else {
			res.status(404)
			throw new Error('Enlace ha caducado, debe registrarse de nuevo')
		}
	} else {
		return res.json({
			message: 'Something went wrong. Try again',
		})
	}
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('Usuario no encontrado')
	}
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: req.user && req.user.isAdmin ? updatedUser.isAdmin : false,
			token: generateToken(updatedUser._id),
		})
	} else {
		res.status(404)
		throw new Error('Usuario no encontrado')
	}
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({}).select('-password')
	res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		if (user.isAdmin) {
			res.status(400)
			throw new Error('Prohibido eliminar cuenta de administrador')
		} else {
			await user.remove()
			res.json({ message: 'Usuario borrado' })
		}
	} else {
		res.status(404)
		throw new Error('Usuario no encontrado')
	}
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')

	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('Usuario no encontrado')
	}
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: req.user && req.user.isAdmin ? updatedUser.isAdmin : false,
		})
	} else {
		res.status(404)
		throw new Error('Usuario no encontrado')
	}
})

exports.forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body

	const user = await User.findOne({ email })

	if (!user) {
		res.status(404)
		throw new Error('Usuario con correo indicado no encontrado')
	}

	const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' })

	user.resetPasswordLink = token

	await user.save()

	res.json(user)
})

exports.resetPassword = asyncHandler(async (req, res) => {
	const { resetPasswordLink, password } = req.body

	if (resetPasswordLink) {
		let isStillValid = true

		const user = await User.findOne({ resetPasswordLink })

		jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, async function (err, decoded) {
			if (err) {
				isStillValid = false
			}
		})

		if (!isStillValid) {
			res.status(401)
			throw new Error('Enlace ha vencido. Realizar proceso de nuevo.')
		} else if (!user) {
			res.status(401)
			throw new Error('Algo ha fallado, intente luego.')
		} else {
			user.password = password
			user.resetPasswordLink = ''

			await user.save()
			res.json(user)
		}
	}
})

exports.preSignup = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const user = await User.findOne({ email })

	if (user) {
		res.status(400)
		throw new Error('Email ya en uso.')
	} else {
		const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' })

		res.json(token)
	}
})
