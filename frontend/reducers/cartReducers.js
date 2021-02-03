import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_CLEAR_ITEMS,
	CART_REMOVE_SHIPPING_ADDRESS,
	CART_UPDATE,
} from '../constants/cartConstants'

export const cartReducer = (
	state = {
		cartItems: [],
		shippingAddress: {},
		paymentMethod: {},
		discountTotal: 0,
		freeAmount: 0,
		subTotal: 0,
		total: 0,
	},
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload

			const existItem = state.cartItems.find((x) => x.product === item.product)

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			}
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			}
		case CART_REMOVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: {},
			}
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			}
		case CART_UPDATE:
			return {
				...state,
				discountTotal: state.cartItems
					.reduce((acc, item) => acc + item.discountAmount + item.discountDealAmount, 0)
					.toFixed(2),
				freeAmount: state.cartItems.reduce((acc, item) => acc + item.freeAmount, 0).toFixed(2),
				subTotal: state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2),
				total: (
					state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) -
					(state.cartItems.reduce((acc, item) => acc + item.discountAmount + item.discountDealAmount, 0) +
						state.cartItems.reduce((acc, item) => acc + item.freeAmount, 0))
				).toFixed(2),
			}
		case CART_CLEAR_ITEMS:
			return {
				...state,
				cartItems: [],
			}
		default:
			return state
	}
}
