import {
	SHOP_DETAILS_REQUEST,
	SHOP_DETAILS_SUCCESS,
	SHOP_DETAILS_FAIL,
	SHOP_DELETE_REQUEST,
	SHOP_DELETE_SUCCESS,
	SHOP_DELETE_FAIL,
	SHOP_CREATE_RESET,
	SHOP_CREATE_FAIL,
	SHOP_CREATE_SUCCESS,
	SHOP_CREATE_REQUEST,
	SHOP_UPDATE_REQUEST,
	SHOP_UPDATE_SUCCESS,
	SHOP_UPDATE_FAIL,
	SHOP_UPDATE_RESET,
	SHOP_UPDATE_FAIL_RESET,
	SHOP_SEND_EMAIL_FAIL,
	SHOP_SEND_EMAIL_REQUEST,
	SHOP_SEND_EMAIL_SUCCESS,
} from '../constants/shopConstants'

export const shopSendEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case SHOP_SEND_EMAIL_REQUEST:
			return { ...state, loading: true }
		case SHOP_SEND_EMAIL_SUCCESS:
			return { loading: false, success: true }
		case SHOP_SEND_EMAIL_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const shopDetailsReducer = (state = { shop: {} }, action) => {
	switch (action.type) {
		case SHOP_DETAILS_REQUEST:
			return { ...state, loading: true }
		case SHOP_DETAILS_SUCCESS:
			return { loading: false, shop: action.payload }
		case SHOP_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const shopDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case SHOP_DELETE_REQUEST:
			return { loading: true }
		case SHOP_DELETE_SUCCESS:
			return { loading: false, success: true }
		case SHOP_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const shopCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SHOP_CREATE_REQUEST:
			return { loading: true }
		case SHOP_CREATE_SUCCESS:
			return { loading: false, success: true, shop: action.payload }
		case SHOP_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case SHOP_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const shopUpdateReducer = (state = { shop: {} }, action) => {
	switch (action.type) {
		case SHOP_UPDATE_REQUEST:
			return { loading: true }
		case SHOP_UPDATE_SUCCESS:
			return { loading: false, success: true, shop: action.payload }
		case SHOP_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case SHOP_UPDATE_FAIL_RESET:
			return { error: '' }
		case SHOP_UPDATE_RESET:
			return { shop: {}, success: false }
		default:
			return state
	}
}
