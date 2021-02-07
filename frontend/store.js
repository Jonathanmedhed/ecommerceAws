import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { alertReducer } from './reducers/alertReducers'
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productReviewCreateReducer,
	productTopRatedReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
	shopDetailsReducer,
	shopCreateReducer,
	shopDeleteReducer,
	shopUpdateReducer,
	shopSendEmailReducer,
} from './reducers/shopReducers'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
	sendRecoverReducer,
	resetPasswordReducer,
	preRegisterReducer,
} from './reducers/userReducers'
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderApproveReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderCancelReducer,
	orderListMyReducer,
	orderListReducer,
	orderViewReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
	alerts: alertReducer,
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productReviewCreate: productReviewCreateReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducer,
	shopSendEmail: shopSendEmailReducer,
	shopDetails: shopDetailsReducer,
	shopCreate: shopCreateReducer,
	shopDelete: shopDeleteReducer,
	shopUpdate: shopUpdateReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	sendRecover: sendRecoverReducer,
	resetPassword: resetPasswordReducer,
	preRegister: preRegisterReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderApprove: orderApproveReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderCancel: orderCancelReducer,
	orderView: orderViewReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
})

const cartItemsFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: []
		: null

const userInfoFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: null
		: null

const discountTotalFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('discountTotal')
			? JSON.parse(localStorage.getItem('discountTotal'))
			: null
		: null

const freeAmountFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('freeAmount')
			? JSON.parse(localStorage.getItem('freeAmount'))
			: null
		: null

const subTotalFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('subTotal')
			? JSON.parse(localStorage.getItem('subTotal'))
			: null
		: null

const totalFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('total')
			? JSON.parse(localStorage.getItem('total'))
			: null
		: null

const shippingAddressFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('shippingAddress')
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: {}
		: null

const paymentMethodFromStorage =
	typeof window !== 'undefined'
		? localStorage.getItem('paymentMethod')
			? JSON.parse(localStorage.getItem('paymentMethod'))
			: null
		: null

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
		discountTotal: discountTotalFromStorage,
		freeAmount: freeAmountFromStorage,
		subTotal: subTotalFromStorage,
		total: totalFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
