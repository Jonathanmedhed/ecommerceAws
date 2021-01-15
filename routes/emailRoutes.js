const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

// @route Post api/users/send-email
// @desc send email
// @access private
router.post('/send-email', async (req, res) => {
	/**
	 * Email Account that will be used to send emails
	 * Port that the transporter ill use
	 */
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		port: 465,
		secure: true,
		auth: {
			user: 'jonathanmedhed@gmail.com',
			pass: process.env.PASSWORD,
		},
	})

	/**
	 * App's Email
	 */
	const appEmail = 'easypeasyserviceapp@gmail.com'

	try {
		const { emailToSend } = req.body
		emailToSend.from = appEmail
		transporter.sendMail(emailToSend, (error, info) => {
			if (error) {
				console.log(error)
				res.status(400).send({
					msg: error,
				})
			} else {
				res.json({ ok: 'email sent!' }).send()
			}
		})
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
