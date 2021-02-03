const path = require('path')
const express = require('express')
const multer = require('multer')
const aws = require('aws-sdk')

const router = express.Router()

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
	},
})

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only!')
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

aws.config.region = 'us-east-2'

// @route   GET api/upload/sign-s3
// @desc    Get upload img and get url
// @access  Public
router.get('/sign-s3', async (req, res) => {
	const s3 = new aws.S3()
	const fileName = req.query['file-name']
	const fileType = req.query['file-type']
	const s3Params = {
		Bucket: process.env.S3_BUCKET,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read',
	}
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err)
			return res.end()
		}
		const returnData = {
			signedRequest: data,
			url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`,
		}
		res.send(JSON.stringify(returnData))
	})
})

module.exports = router
