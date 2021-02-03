import axios from 'axios'
// constants
import {
	SHOP_DETAILS_REQUEST,
	SHOP_DETAILS_SUCCESS,
	SHOP_DETAILS_FAIL,
	SHOP_DELETE_SUCCESS,
	SHOP_DELETE_REQUEST,
	SHOP_DELETE_FAIL,
	SHOP_CREATE_REQUEST,
	SHOP_CREATE_SUCCESS,
	SHOP_CREATE_FAIL,
	SHOP_UPDATE_REQUEST,
	SHOP_UPDATE_SUCCESS,
	SHOP_UPDATE_FAIL,
	SHOP_SEND_EMAIL_FAIL,
	SHOP_SEND_EMAIL_REQUEST,
	SHOP_SEND_EMAIL_SUCCESS,
} from '../constants/shopConstants'
import { API } from '../config'
// actions
import { setAlert } from './alertActions'
// utilities
import {
	validatePhone,
	validateMobile,
	validateEmail,
	validateFacebook,
	validateInstagram,
	validateTwitter,
	validateID,
} from '../utilities/utilities'
import { configAuthOnly, configJsonOrAuth, configJsonAndAuth, processError } from '../utilities/errorHandler'

export const sendEmail = (email, subject, text, html) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SHOP_SEND_EMAIL_REQUEST,
		})
		const {
			userLogin: { userInfo },
		} = getState()

		const config = configJsonOrAuth(userInfo && userInfo)

		const emailToSend = {
			from: '',
			to: email,
			subject: subject,
			text: text,
			html: html,
		}

		const { data } = await axios.post(`${API}/email/send-email`, { emailToSend }, config)

		dispatch({
			type: SHOP_SEND_EMAIL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, SHOP_SEND_EMAIL_FAIL, dispatch)
	}
}

export const shopDetails = () => async (dispatch) => {
	try {
		dispatch({ type: SHOP_DETAILS_REQUEST })

		const { data } = await axios.get(`${API}/shop`)
		dispatch({
			type: SHOP_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, SHOP_DETAILS_FAIL, dispatch)
	}
}

export const deleteShop = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SHOP_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		await axios.delete(`${API}/shop`, config)

		dispatch({
			type: SHOP_DELETE_SUCCESS,
		})
	} catch (error) {
		processError(error, SHOP_DELETE_FAIL, dispatch)
	}
}

export const createShop = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SHOP_CREATE_REQUEST,
		})
		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		const { data } = await axios.post(`${API}/shop`, {}, config)

		dispatch({
			type: SHOP_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, SHOP_CREATE_FAIL, dispatch)
	}
}

export const updateShop = (shop) => async (dispatch, getState) => {
	try {
		if (shop.phone && !validatePhone(shop.phone)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Telefonos / Email: Formato de telefono local invalido',
			})
			dispatch(setAlert('Telefonos / Email: Formato de telefono local invalido', 'error'))
		} else if (!shop.address) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Dirección y Localización: Direccion Requerida',
			})
			dispatch(setAlert('Dirección y Localización: Direccion Requerida', 'error'))
		} else if (!shop.city) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Dirección y Localización: Ciudad Requerida',
			})
			dispatch(setAlert('Dirección y Localización: Ciudad Requerida', 'error'))
		} else if (!shop.postalCode) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Dirección y Localización: Codigo Postal Requerido',
			})
			dispatch(setAlert('Dirección y Localización: Codigo Postal Requerido', 'error'))
		} else if (!shop.country) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Dirección y Localización: País Requerido',
			})
			dispatch(setAlert('Dirección y Localización: País Requerido', 'error'))
		} else if (!shop.email) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Telefonos / Email: Email Requerido',
			})
			dispatch(setAlert('Telefonos / Email: Email Requerido', 'error'))
		} else if (!shop.title) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Pagina Principal: Titulo Requerido',
			})
			dispatch(setAlert('Pagina Principal: Titulo Requerido', 'error'))
		} else if (!shop.message) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Pagina Principal: Mensaje Requerido',
			})
			dispatch(setAlert('Pagina Principal: Mensaje Requerido', 'error'))
		} else if (!shop.dollarValue || shop.dollarValue === '0') {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Valor del dolar requerido',
			})
			dispatch(setAlert('Valor del dolar requerido', 'error'))
		} else if (!shop.mobileBank) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Pago Movil: Banco Requerido',
			})
			dispatch(setAlert('Pago Movil: Banco Requerido', 'error'))
		} else if (!shop.mobilePhone) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Pago Movil: Telefono Requerido',
			})
			dispatch(setAlert('Pago Movil: Telefono Requerido', 'error'))
		} else if (shop.mobilePhone && !validatePhone(shop.mobilePhone)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Pago Movil: Formato de telefono movil invalido',
			})
			dispatch(setAlert('Pago Movil: Formato de telefono movil invalido', 'error'))
		} else if (!shop.mobileID) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Pago Movil: Cedula Requerida',
			})
			dispatch(setAlert('Pago Movil: Cedula Requerida', 'error'))
		} else if (!shop.waitTime || shop.waitTime === '0') {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Tiempo de Espera: Tiempo de espera requerido',
			})
			dispatch(setAlert('Tiempo de Espera: Tiempo de espera requerido', 'error'))
		} else if (!shop.name) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Nombre y Logo: Tienda debe tener nombre',
			})
			dispatch(setAlert('Nombre y Logo: Tienda debe tener nombre', 'error'))
		} else if (shop.mobile && !validateMobile(shop.mobile)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Telefonos / Email: Formato invalido de movil +58 412 5555555',
			})
			dispatch(setAlert('Telefonos / Email: Formato invalido de movil +58 412 5555555', 'error'))
		} else if (shop.email && !validateEmail(shop.email)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Telefonos / Email: Correo invalido',
			})
			dispatch(setAlert('Telefonos / Email: Correo invalido', 'error'))
		} else if (shop.facebook && !validateFacebook(shop.facebook)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Redes Sociales: Link de facebook invalido (https://www.facebook.com/...)',
			})
			dispatch(setAlert('Redes Sociales: Link de facebook invalido (https://www.facebook.com/...)', 'error'))
		} else if (shop.instagram && !validateInstagram(shop.instagram)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Redes Sociales: Link de instagram invalido (https://www.instagram.com/...)',
			})
			dispatch(setAlert('Link de instagram invalido (https://www.instagram.com/...)', 'error'))
		} else if (shop.twitter && !validateTwitter(shop.twitter)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Redes Sociales: Link de twitter invalido (https://www.twitter.com/...)',
			})
			dispatch(setAlert('Link de twitter invalido (https://www.twitter.com/...)', 'error'))
		} else if (shop.mobileID && !validateID(shop.mobileID)) {
			dispatch({
				type: SHOP_UPDATE_FAIL,
				payload: 'Pago Movil Datos: Cedula Invalida (V-18... o E-18...))',
			})
			dispatch(setAlert('Pago Movil Datos: Cedula Invalida (V-18... o E-18...))', 'error'))
		} else {
			dispatch({
				type: SHOP_UPDATE_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = configJsonAndAuth(userInfo)

			const { data } = await axios.put(`${API}/shop`, shop, config)

			dispatch({
				type: SHOP_UPDATE_SUCCESS,
				payload: data,
			})

			dispatch(setAlert('Informacion Modificada', 'success'))
		}
	} catch (error) {
		processError(error, SHOP_UPDATE_FAIL, dispatch)
	}
}
