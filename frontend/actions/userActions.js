import axios from 'axios'
// constants
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_DETAILS_RESET,
	USER_LIST_FAIL,
	USER_LIST_SUCCESS,
	USER_LIST_REQUEST,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_FAIL,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_REQUEST,
	SEND_RECOVER_REQUEST,
	SEND_RECOVER_FAIL,
	SEND_RECOVER_SUCCESS,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_REQUEST,
	PRE_REGISTER_REQUEST,
	PRE_REGISTER_FAIL,
	PRE_REGISTER_SUCCESS,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET, ORDER_LIST_RESET, ORDER_VIEWED_SUCCESS } from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import { API } from '../config'
// utilities
import { validateEmail } from '../utilities/utilities'
import { configJsonOnly, configAuthOnly, configJsonAndAuth, processError } from '../utilities/errorHandler'
import { removeAlert, setAlert } from './alertActions'
import { generateEmailPassword, generateEmailResetSuccess, generateEmailRegister } from '../utilities/emailGeneration'
import { sendEmail } from './shopActions'

export const login = (email, password) => async (dispatch) => {
	try {
		if (!password) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: 'Contraseña requerida',
			})
			dispatch(setAlert('Contraseña requerida', 'error'))
		} else if (!email) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: 'Email requerido',
			})
			dispatch(setAlert('Email requerido', 'error'))
		} else if (validateEmail(email)) {
			dispatch({
				type: USER_LOGIN_REQUEST,
			})

			const config = configJsonOnly()

			const { data } = await axios.post(`${API}/users/login`, { email, password }, config)

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})

			// update order list
			dispatch({
				type: ORDER_VIEWED_SUCCESS,
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
			dispatch(removeAlert())
		} else {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: 'Correo Invalido',
			})
		}
	} catch (error) {
		processError(error, USER_LOGIN_FAIL, dispatch)
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	localStorage.removeItem('cartItems')
	localStorage.removeItem('shippingAddress')
	localStorage.removeItem('paymentMethod')
	localStorage.removeItem('subTotal')
	localStorage.removeItem('total')
	localStorage.removeItem('discountTotal')
	localStorage.removeItem('freeAmount')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: ORDER_LIST_MY_RESET })
	dispatch({ type: ORDER_LIST_RESET })
	dispatch({ type: USER_LIST_RESET })
	dispatch({ type: CART_CLEAR_ITEMS })
	dispatch(removeAlert())
	document.location.href = '/login'
}

export const register = (token) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = configJsonOnly()

		const { data } = await axios.post(`${API}/users`, { token }, config)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		dispatch(setAlert('Cuenta Activada', 'success'))

		localStorage.setItem('userInfo', JSON.stringify(data))
		dispatch(removeAlert())
	} catch (error) {
		processError(error, USER_REGISTER_FAIL, dispatch)
	}
}

export const createUser = (name, email, password, confirmPassword, isAdmin) => async (dispatch) => {
	try {
		if (!validateEmail(email)) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: 'Correo Invalido',
			})
			dispatch(setAlert('Correo Invalido', 'error'))
		} else if (!email) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: 'Correo Requerido',
			})
			dispatch(setAlert('Correo Requerido', 'error'))
		} else if (!name) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: 'Nombre Requerido',
			})
			dispatch(setAlert('Nombre Requerido', 'error'))
		} else if (!password) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: 'Contraseña Requerida',
			})
			dispatch(setAlert('Contraseña Requerida', 'error'))
		} else if (password !== confirmPassword) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: 'Contraseñas no iguales',
			})
			dispatch(setAlert('Contraseñas no iguales', 'error'))
		} else {
			dispatch({
				type: USER_REGISTER_REQUEST,
			})

			const config = configJsonOnly()

			const { data } = await axios.post(`${API}/users`, { name, email, password, isAdmin }, config)

			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: data,
			})
			dispatch(removeAlert())
		}
	} catch (error) {
		processError(error, USER_REGISTER_FAIL, dispatch)
	}
}

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		const { data } = await axios.get(`${API}/users/${id}`, config)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
		dispatch(removeAlert())
	} catch (error) {
		processError(error, USER_DETAILS_FAIL, dispatch)
	}
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		if (!user.email) {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: 'Correo Requerido',
			})
			dispatch(setAlert('Correo Requerido', 'error'))
		} else if (!user.name) {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: 'Nombre Requerido',
			})
			dispatch(setAlert('Nombre Requerido', 'error'))
		} else if (!user.password || !user.confirmPassword) {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: 'Contraseña Requerida',
			})
			dispatch(setAlert('Contraseña Requerida', 'error'))
		} else if (user.password !== user.confirmPassword) {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: 'Contraseñas no son iguales',
			})
			dispatch(setAlert('Contraseñas no son iguales', 'error'))
		} else {
			dispatch({
				type: USER_UPDATE_PROFILE_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = configJsonAndAuth(userInfo)

			const { data } = await axios.put(`${API}/users/profile`, user, config)

			dispatch({
				type: USER_UPDATE_PROFILE_SUCCESS,
				payload: data,
			})
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})
			localStorage.setItem('userInfo', JSON.stringify(data))
			dispatch(removeAlert())
		}
	} catch (error) {
		processError(error, USER_UPDATE_PROFILE_FAIL, dispatch)
	}
}

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		const { data } = await axios.get(`${API}/users`, config)

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		})
		dispatch(removeAlert())
	} catch (error) {
		processError(error, USER_LIST_FAIL, dispatch)
	}
}

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		await axios.delete(`${API}/users/${id}`, config)

		dispatch({ type: USER_DELETE_SUCCESS })
		dispatch(removeAlert())
	} catch (error) {
		processError(error, USER_DELETE_FAIL, dispatch)
	}
}

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		if (!validateEmail(user.email)) {
			dispatch({
				type: USER_UPDATE_FAIL,
				payload: 'Correo Invalido',
			})
			dispatch(setAlert('Correo Invalido', 'error'))
		} else if (!user.email) {
			dispatch({
				type: USER_UPDATE_FAIL,
				payload: 'Correo Requerido',
			})
			dispatch(setAlert('Correo Requerido', 'error'))
		} else if (!user.name) {
			dispatch({
				type: USER_UPDATE_FAIL,
				payload: 'Nombre Requerido',
			})
			dispatch(setAlert('Nombre Requerido', 'error'))
		} else {
			dispatch({
				type: USER_UPDATE_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = configJsonAndAuth(userInfo)

			const { data } = await axios.put(`${API}/users/${user._id}`, user, config)

			dispatch({ type: USER_UPDATE_SUCCESS })

			dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

			dispatch(removeAlert())
		}
	} catch (error) {
		processError(error, USER_UPDATE_FAIL, dispatch)
	}
}

export const forgotPassword = (email) => async (dispatch, getState) => {
	try {
		if (!email) {
			dispatch({
				type: SEND_RECOVER_FAIL,
				payload: 'Email requerido',
			})
			dispatch(setAlert('Email requerido', 'error'))
		} else if (!validateEmail(email)) {
			dispatch({
				type: SEND_RECOVER_FAIL,
				payload: 'Email requerido',
			})
			dispatch(setAlert('Email invalido', 'error'))
		} else {
			dispatch({
				type: SEND_RECOVER_REQUEST,
			})
			const {
				shopDetails: { shop },
			} = getState()

			const config = configJsonOnly()

			const { data, status } = await axios.put(`${API}/users/forgot-password`, { email }, config)

			const { emailText, emailHtml } = generateEmailPassword(shop, data)

			if (status === 200) {
				await dispatch(sendEmail(data.email, `${shop.name}: Reseteo de contraseña`, emailText, emailHtml))

				dispatch({ type: SEND_RECOVER_SUCCESS })
			}
		}
	} catch (error) {
		processError(error, SEND_RECOVER_FAIL, dispatch)
	}
}

export const resetPassword = (resetInfo) => async (dispatch, getState) => {
	try {
		if (!resetInfo.password || !resetInfo.confirmPassword) {
			dispatch({
				type: RESET_PASSWORD_FAIL,
				payload: 'Contraseña Requerida',
			})
			dispatch(setAlert('Contraseña Requerida', 'error'))
		} else if (resetInfo.password !== resetInfo.confirmPassword) {
			dispatch({
				type: RESET_PASSWORD_FAIL,
				payload: 'Contraseñas no son iguales',
			})
			dispatch(setAlert('Contraseñas no son iguales', 'error'))
		} else {
			dispatch({
				type: RESET_PASSWORD_REQUEST,
			})

			const {
				shopDetails: { shop },
			} = getState()

			const config = configJsonOnly()

			const { data, status } = await axios.put(`${API}/users/reset-password`, resetInfo, config)

			const { emailText, emailHtml } = generateEmailResetSuccess(shop, data)

			if (status === 200) {
				await dispatch(sendEmail(data.email, `${shop.name}: Contraseña actualizada`, emailText, emailHtml))

				dispatch({ type: RESET_PASSWORD_SUCCESS })
			}
		}
	} catch (error) {
		processError(error, RESET_PASSWORD_FAIL, dispatch)
	}
}

export const preRegister = (name, email, password, confirmPassword) => async (dispatch, getState) => {
	try {
		if (!password || !confirmPassword) {
			dispatch({
				type: PRE_REGISTER_FAIL,
				payload: 'Contraseñas requeridas',
			})
			dispatch(setAlert('Contraseñas requeridas', 'error'))
		} else if (!password) {
			dispatch({
				type: PRE_REGISTER_FAIL,
				payload: 'Correo Invalido',
			})
			dispatch(setAlert('Correo Invalido', 'error'))
		} else if (!validateEmail(email)) {
			dispatch({
				type: PRE_REGISTER_FAIL,
				payload: 'Correo Invalido',
			})
			dispatch(setAlert('Correo Invalido', 'error'))
		} else if (!name) {
			dispatch({
				type: PRE_REGISTER_FAIL,
				payload: 'Nombre Requerido',
			})
			dispatch(setAlert('Nombre Requerido', 'error'))
		} else {
			dispatch({
				type: PRE_REGISTER_REQUEST,
			})

			const {
				shopDetails: { shop },
			} = getState()

			const config = configJsonOnly()

			const { data, status } = await axios.post(`${API}/users/pre-signup`, { name, email, password }, config)

			const { emailText, emailHtml } = generateEmailRegister(shop, name, data)

			if (status === 200) {
				await dispatch(sendEmail(email, `${shop.name}: Validación Registro`, emailText, emailHtml))

				dispatch({
					type: PRE_REGISTER_SUCCESS,
				})

				dispatch(removeAlert())
			}
		}
	} catch (error) {
		processError(error, PRE_REGISTER_FAIL, dispatch)
	}
}

export const loginWithGoogle = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const config = configJsonOnly()

		const { data } = await axios.post(`${API}/users/google-login`, user, config)

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		// update order list
		dispatch({
			type: ORDER_VIEWED_SUCCESS,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
		dispatch(removeAlert())
	} catch (error) {
		processError(error, USER_LOGIN_FAIL, dispatch)
	}
}
