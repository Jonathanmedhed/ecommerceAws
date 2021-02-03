import axios from 'axios'
// constants
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_PAY_FAIL,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_REQUEST,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_FAIL,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_REQUEST,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_REQUEST,
	ORDER_APPROVE_FAIL,
	ORDER_APPROVE_SUCCESS,
	ORDER_APPROVE_REQUEST,
	ORDER_CANCEL_REQUEST,
	ORDER_CANCEL_SUCCESS,
	ORDER_CANCEL_FAIL,
	ORDER_VIEWED_SUCCESS,
	ORDER_VIEWED_FAIL,
} from '../constants/orderConstants'
import { API } from '../config'
// actions
import { sendEmail } from './shopActions'
import { setAlert } from './alertActions'
// utilities
import { validateMobileReference } from '../utilities/utilities'
import { generateEmail } from '../utilities/emailGeneration'
import { configAuthOnly, configJsonOrAuth, configJsonAndAuth, processError } from '../utilities/errorHandler'

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		if (!order.orderItems || order.orderItems.length === 0) {
			dispatch({
				type: ORDER_CREATE_FAIL,
				payload: 'Carro vacio',
			})
		} else if (!order.paymentMethod) {
			dispatch({
				type: ORDER_CREATE_FAIL,
				payload: 'Metodo de pago requerido',
			})
		} else {
			dispatch({
				type: ORDER_CREATE_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = configJsonOrAuth(userInfo && userInfo)

			const { data } = await axios.post(userInfo ? `${API}/orders` : `${API}/orders/guest`, order, config)

			dispatch({
				type: ORDER_CREATE_SUCCESS,
				payload: data,
			})
			dispatch({
				type: CART_CLEAR_ITEMS,
				payload: data,
			})
			localStorage.removeItem('cartItems')
		}
	} catch (error) {
		processError(error, ORDER_CREATE_FAIL, dispatch)
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configJsonOrAuth(userInfo && userInfo)

		const { data } = await axios.get(userInfo ? `${API}/orders/${id}` : `${API}/orders/${id}/guest`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, ORDER_DETAILS_FAIL, dispatch)
	}
}

export const approveOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_APPROVE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const {
			shopDetails: { shop },
		} = getState()

		const config = configAuthOnly(userInfo)

		const { data, status } = await axios.put(`${API}/orders/${order._id}/approve`, {}, config)

		const { emailText, emailHtml } = generateEmail(data, shop, 'aprobada')

		if (status === 200) {
			await dispatch(
				sendEmail(
					order.user ? order.user.email : order.guest && order.guest.email,
					`${shop.name}: Orden Aprobada`,
					emailText,
					emailHtml
				)
			)
		}

		dispatch({
			type: ORDER_APPROVE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, ORDER_APPROVE_FAIL, dispatch)
	}
}

export const payOrder = (order, paymentReference, pickupAt) => async (dispatch, getState) => {
	try {
		if (!validateMobileReference(paymentReference)) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload: 'Referencia invalida (000000123456)',
			})
		} else if (!pickupAt) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload: 'Fecha Requerida',
			})
		} else {
			dispatch({
				type: ORDER_PAY_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			if (!userInfo && order.guest && !order.guest.name) {
				dispatch({
					type: ORDER_PAY_FAIL,
					payload: 'Nombre Requerido',
				})
			} else if (!userInfo && order.guest && !order.guest.email) {
				dispatch({
					type: ORDER_PAY_FAIL,
					payload: 'Email Requerido',
				})
			} else if (!userInfo && order.guest && !order.guest.phone) {
				dispatch({
					type: ORDER_PAY_FAIL,
					payload: 'Nro de Telefono Requerido',
				})
			} else {
				const {
					shopDetails: { shop },
				} = getState()

				const config = configJsonOrAuth(userInfo && userInfo)

				const { data, status } = await axios.put(
					userInfo ? `${API}/orders/${order._id}/pay` : `${API}/orders/${order._id}/pay/guest`,
					{ paymentReference: paymentReference, pickupAt: pickupAt, guest: order.guest ? order.guest : null },
					config
				)

				order.paymentReference = paymentReference

				const { emailText, emailHtml } = generateEmail(order, shop, 'recibida')

				const { emailText: emailTextAdmin, emailHtml: emailHtmlAdmin } = generateEmail(order, shop, null, true)

				if (status === 200) {
					await dispatch(
						sendEmail(
							shop.email,
							`${shop.name}: Nueva Orden (${order.paymentMethod})`,
							emailTextAdmin,
							emailHtmlAdmin
						)
					)
					await dispatch(
						sendEmail(
							order.user ? order.user.email : order.guest && order.guest.email,
							`${shop.name}: Orden Recibida`,
							emailText,
							emailHtml
						)
					)
					dispatch({
						type: ORDER_PAY_SUCCESS,
						payload: data,
					})

					window.scrollTo(0, 0)
				}
			}
		}
	} catch (error) {
		processError(error, ORDER_PAY_FAIL, dispatch)
	}
}

export const setOrderCash = (order, change, pickupAt) => async (dispatch, getState) => {
	try {
		if (change > 0) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload: 'Billetes no suficientes',
			})
		} else if (!pickupAt) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload: 'Fecha Requerida',
			})
		} else {
			dispatch({
				type: ORDER_PAY_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			if (!userInfo && order.guest && !order.guest.name) {
				dispatch({
					type: ORDER_PAY_FAIL,
					payload: 'Nombre Requerido',
				})
			} else if (!userInfo && order.guest && !order.guest.email) {
				dispatch({
					type: ORDER_PAY_FAIL,
					payload: 'Email Requerido',
				})
			} else if (!userInfo && order.guest && !order.guest.phone) {
				dispatch({
					type: ORDER_PAY_FAIL,
					payload: 'Nro de Telefono Requerido',
				})
			} else {
				const {
					shopDetails: { shop },
				} = getState()

				const config = configJsonOrAuth(userInfo && userInfo)

				const { data, status } = await axios.put(
					userInfo ? `${API}/orders/${order._id}/pay` : `${API}/orders/${order._id}/pay/guest`,
					{
						isSetAside: true,
						change: change * -1,
						pickupAt: pickupAt,
						guest: order.guest ? order.guest : null,
					},
					config
				)

				const { emailText, emailHtml } = generateEmail(order, shop, 'recibida')

				const { emailText: emailTextAdmin, emailHtml: emailHtmlAdmin } = generateEmail(order, shop, null, true)

				if (status === 200) {
					await dispatch(
						sendEmail(
							shop.email,
							`${shop.name}: Nueva Orden (${order.paymentMethod})`,
							emailTextAdmin,
							emailHtmlAdmin
						)
					)
					await dispatch(
						sendEmail(
							order.user ? order.user.email : order.guest && order.guest.email,
							`${shop.name}: Orden Recibida`,
							emailText,
							emailHtml
						)
					)

					dispatch({
						type: ORDER_PAY_SUCCESS,
						payload: data,
					})

					window.scrollTo(0, 0)
				}
			}
		}
	} catch (error) {
		processError(error, ORDER_PAY_FAIL, dispatch)
	}
}

export const payOrderCash = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configJsonAndAuth(userInfo)

		order.isPaid = true

		const { data } = await axios.put(`${API}/orders/${order._id}/pay`, order, config)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, ORDER_PAY_FAIL, dispatch)
	}
}

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		const { data } = await axios.put(`${API}/orders/${order._id}/deliver`, {}, config)

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, ORDER_DELIVER_FAIL, dispatch)
	}
}

export const cancelOrder = (order, activate, canceledReason) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CANCEL_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const {
			shopDetails: { shop },
		} = getState()

		const config = configJsonAndAuth(userInfo)

		const { data, status } = await axios.put(
			`${API}/orders/${order._id}/cancel`,
			{ activate: activate && activate, canceledReason: canceledReason && canceledReason },
			config
		)

		order.canceledReason = canceledReason ? canceledReason : null

		const { emailText: emailTextCanceled, emailHtml: emailHtmlCanceled } = generateEmail(order, shop, 'anulada')

		const { emailText, emailHtml } = generateEmail(order, shop, 're-activada')

		if (status === 200 && (order.user || order.guest)) {
			if (canceledReason) {
				await dispatch(
					sendEmail(
						order.user ? order.user.email : order.guest && order.guest.email,
						`${shop.name}: Order Anulada`,
						emailTextCanceled,
						emailHtmlCanceled
					)
				)
			} else {
				await dispatch(
					sendEmail(
						order.user ? order.user.email : order.guest && order.guest.email,
						`${shop.name}: Order Re-Activada`,
						emailText,
						emailHtml
					)
				)
			}
		}

		dispatch({
			type: ORDER_CANCEL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, ORDER_CANCEL_FAIL, dispatch)
	}
}

export const checkOrder = (order) => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		await axios.put(`${API}/orders/${order._id}/check`, {}, config)

		dispatch({
			type: ORDER_VIEWED_SUCCESS,
		})
	} catch (error) {
		processError(error, ORDER_VIEWED_FAIL, dispatch)
	}
}

export const updateOrderDollar = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		})

		const { data } = await axios.put(`${API}/orders/${order._id}/dollar`)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
		dispatch(setAlert('Precios Actualizados', 'success'))
	} catch (error) {
		processError(error, ORDER_DETAILS_FAIL, dispatch)
	}
}

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		const { data } = await axios.get(`${API}/orders/myorders`, config)

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, ORDER_LIST_MY_FAIL, dispatch)
	}
}

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		const { data } = await axios.get(`${API}/orders`, config)

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		processError(error, ORDER_LIST_FAIL, dispatch)
	}
}
