import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const APP_NAME = publicRuntimeConfig.APP_NAME

export const DOMAIN = publicRuntimeConfig.PRODUCTION
	? publicRuntimeConfig.DOMAIN_PRODUCTION
	: publicRuntimeConfig.DOMAIN_DEVELOPMENT

export const API = publicRuntimeConfig.PRODUCTION
	? publicRuntimeConfig.API_PRODUCTION
	: publicRuntimeConfig.API_DEVELOPMENT

export const PRODUCTION = publicRuntimeConfig.PRODUCTION
export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_ID_LOCAL = publicRuntimeConfig.GOOGLE_CLIENT_ID_LOCAL
