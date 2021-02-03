import moment from 'moment'

/**
 * Get qty of certain product in order
 * @param {*} id
 * @param {*} items
 */
export const productInOrder = (id, items) => {
	let qty = items.reduce((acc, item) => acc + (item.product === id ? item.qty : 0), 0)
	let amount = items.reduce(
		(acc, item) =>
			acc +
			(item.product === id
				? Number(item.qty * (item.price - (item.discountAmount + item.discountDealAmount + item.freeAmount)))
				: 0),
		0
	)
	return { qty: qty, amount: amount }
}

/**
 * Get quantity of products in order
 * @param {*} items
 */
export const productsInOrder = (items) => {
	let qty = items.reduce((acc, item) => acc + item.qty, 0)

	return qty
}

export const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}

export const validatePhone = (phone) => {
	const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/
	return re.test(phone)
}

export const validateMobile = (phone) => {
	const re = /^\+(?:[0-9] ?){6,14}[0-9]$/
	return re.test(phone)
}

export const validateFacebook = (url) => {
	const re = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9()?]/
	return re.test(url) && (url.includes('https://') || url.includes('http://'))
}

export const validateTwitter = (url) => {
	const re = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9()?]/
	return re.test(url) && (url.includes('https://') || url.includes('http://'))
}

export const validateInstagram = (url) => {
	const re = /^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9()?]/
	return re.test(url) && (url.includes('https://') || url.includes('http://'))
}

export const validateMercadoLibre = (url) => {
	const re = /^(https?:\/\/)?(www\.)?articulo.mercadolibre.com.ve\/[a-zA-Z0-9()?]/
	return re.test(url) && (url.includes('https://') || url.includes('http://'))
}

export const validateMobileReference = (ref) => {
	const re = /^[0-9]{12}$/
	return re.test(ref)
}

export const formatCurrency = (value) => {
	if (value || value === 0) {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
	} else {
		return 'No value'
	}
}

export const numberWithDots = (x) => {
	if (x || x === 0) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
	} else {
		return 'No value'
	}
}

/**
 * Check time difference from today
 */
export const checkDate = (date) => {
	let today = new Date()
	var date1 = moment(date)
	var date2 = moment(today)
	var diff = date2.diff(date1)
	return diff / (60 * 60 * 24 * 1000)
}

export const validateID = (id) => {
	return id.includes('V-') || id.includes('E-')
}
