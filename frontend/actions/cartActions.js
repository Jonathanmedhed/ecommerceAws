import axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_UPDATE,
} from '../constants/cartConstants'
import { API } from '../config'

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`${API}/products/${id}`)

	let discountAmount = data.discount ? qty * data.price * (data.discount / 100) : 0

	let discountAmountQty = data.discount ? qty : 0

	let discountDealAmount =
		data.deal && data.deal.discount && qty / data.deal.amount >= 1
			? Number.isInteger(qty / data.deal.amount)
				? qty * data.price * (data.deal.discount / 100)
				: !Number.isInteger(qty / data.deal.amount) &&
				  Math.floor(qty / data.deal.amount) * data.deal.amount * data.price * (data.deal.discount / 100)
			: 0

	let discountDealAmountQty =
		data.deal && data.deal.discount && qty / data.deal.amount >= 1
			? Number.isInteger(qty / data.deal.amount)
				? qty
				: !Number.isInteger(qty / data.deal.amount) && Math.floor(qty / data.deal.amount) * data.deal.amount
			: 0

	let freeAmount =
		data.deal && data.deal.qtyFree && qty / data.deal.amount >= 1
			? Math.floor(qty / data.deal.amount) * data.price
			: 0

	let freeAmountQty =
		data.deal && data.deal.qtyFree && qty / data.deal.amount >= 1 ? Math.floor(qty / data.deal.amount) : 0

	let shippingCost =
		data.shippingCost && qty ? (data.unitShippingCost ? data.shippingCost * qty : data.shippingCost) : 0

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			images: data.images,
			price: data.price,
			countInStock: data.countInStock,
			discount: data.discount && data.discount,
			deal: data.deal && data.deal,
			shippingCost: shippingCost,
			qty,
			discountAmount: discountAmount,
			discountAmountQty: discountAmountQty,
			discountDealAmount: discountDealAmount,
			discountDealAmountQty: discountDealAmountQty,
			freeAmount: freeAmount,
			freeAmountQty: freeAmountQty,
		},
	})

	dispatch({
		type: CART_UPDATE,
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	localStorage.setItem('discountTotal', JSON.stringify(getState().cart.discountTotal))
	localStorage.setItem('freeAmount', JSON.stringify(getState().cart.freeAmount))
	localStorage.setItem('subTotal', JSON.stringify(getState().cart.subTotal))
	localStorage.setItem('total', JSON.stringify(getState().cart.total))
}

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	})

	dispatch({
		type: CART_UPDATE,
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	})

	localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	})

	localStorage.setItem('paymentMethod', JSON.stringify(data))
}
