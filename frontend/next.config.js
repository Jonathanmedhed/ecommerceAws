const withImages = require('next-images')

module.exports = withImages({
	publicRuntimeConfig: {
		APP_NAME: 'HEDDRICHITSOLUTIONS',
		PRODUCTION: false,
		API_DEVELOPMENT: 'http://localhost:8000/api',
		API_PRODUCTION: 'http://seoblog.com/api',
		DOMAIN_DEVELOPMENT: 'http://localhost:3000',
		DOMAIN_PRODUCTION: 'http://seoblog.com',
	},
})
