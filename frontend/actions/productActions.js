import axios from 'axios'
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
} from '../constants/productConstants'
import { API } from '../config'
// actions
import { setAlert, removeAlert } from './alertActions'
// utilities
import { configAuthOnly, configJsonAndAuth, processError } from '../utilities/errorHandler'
import { validateMercadoLibre } from '../utilities/utilities'

const checkProductErrors = (product, dispatch, errorConstant) => {
	if (!product.name) {
		dispatch({
			type: errorConstant,
			payload: 'Informacion General: Nombre Requerido',
		})
		dispatch(setAlert({ title: 'Informacion General:', text: 'Nombre Requerido' }, 'error'))
	} else if (!product.price) {
		dispatch({
			type: errorConstant,
			payload: 'Precio e Inventario: Precio Requerido',
		})
		dispatch(setAlert({ title: 'Precio e Inventario:', text: 'Precio Requerido' }, 'error'))
	} else if (!product.description) {
		dispatch({
			type: errorConstant,
			payload: 'Informacion General: Descripción Requerida',
		})
		dispatch(setAlert({ title: 'Informacion General:', text: 'Descripción Requerida' }, 'error'))
	} else if (!product.images || (product.images && product.images.length === 0)) {
		dispatch({
			type: errorConstant,
			payload: 'Imágenes Requeridas',
		})
		dispatch(setAlert({ title: 'Imágenes', text: 'Imágenes Requeridas' }, 'error'))
	} else if (!product.brand) {
		dispatch({
			type: errorConstant,
			payload: 'Informacion General: Marca Requerida',
		})
		dispatch(setAlert({ title: 'Informacion General:', text: 'Marca Requerida' }, 'error'))
	} else if (!product.category) {
		dispatch({
			type: errorConstant,
			payload: 'Informacion General: Categoria Requerida',
		})
		dispatch(setAlert({ title: 'Informacion General:', text: 'Categoria Requerida' }, 'error'))
	} else if (!product.countInStock) {
		dispatch({
			type: errorConstant,
			payload: 'Precio e Inventario: Inventario Requerido',
		})
		dispatch(setAlert({ title: 'Precio e Inventario:', text: 'Inventario Requerido' }, 'error'))
	} else if (product.deal && product.deal.amount === 0 && (product.deal.discount > 0 || product.deal.qtyFree > 0)) {
		dispatch({
			type: errorConstant,
			payload: 'Oferta: Cantidad de Producto Requerida',
		})
		dispatch(setAlert({ title: 'Oferta:', text: 'Cantidad de Producto Requerida' }, 'error'))
	} else if (product.deal && product.deal.amount > 0 && product.deal.discount === 0 && product.deal.qtyFree === 0) {
		dispatch({
			type: errorConstant,
			payload: 'Oferta: Descuento o Cantidad Gratis Requerido',
		})
		dispatch(setAlert({ title: 'Oferta:', text: 'Descuento o Cantidad Gratis Requerido' }, 'error'))
	} else if (product.deal && product.deal.amount > 0 && product.deal.discount > 0 && product.deal.qtyFree > 0) {
		dispatch({
			type: errorConstant,
			payload: 'Oferta: Elegir Entre Descuento o Cantidad Gratis',
		})
		dispatch(setAlert({ title: 'Oferta:', text: 'Elegir Entre Descuento o Cantidad Gratis' }, 'error'))
	} else if (product.externalLink && !validateMercadoLibre(product.externalLink)) {
		dispatch({
			type: errorConstant,
			payload: 'Enlace de mercado libre invalido',
		})
		dispatch(setAlert({ title: 'Enlace de mercado libre:', text: 'Enlace invalido' }, 'error'))
	} else {
		return false
	}
}

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })

		const { data } = await axios.get(`${API}/products?keyword=${keyword}&pageNumber=${pageNumber}`)

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})

		dispatch(removeAlert())
	} catch (error) {
		processError(error, PRODUCT_LIST_FAIL, dispatch)
	}
}

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })

		const { data } = await axios.get(`${API}/products/${id}`)

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		})

		dispatch(removeAlert())
	} catch (error) {
		processError(error, PRODUCT_DETAILS_FAIL, dispatch)
	}
}

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = configAuthOnly(userInfo)

		await axios.delete(`${API}/products/${id}`, config)

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		})

		dispatch(removeAlert())
	} catch (error) {
		processError(error, PRODUCT_DELETE_FAIL, dispatch)
	}
}

export const createProduct = (product) => async (dispatch, getState) => {
	try {
		if (checkProductErrors(product, dispatch, PRODUCT_CREATE_FAIL) === false) {
			dispatch({
				type: PRODUCT_CREATE_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = configJsonAndAuth(userInfo)

			const { data } = await axios.post(`${API}/products`, product, config)

			dispatch({
				type: PRODUCT_CREATE_SUCCESS,
				payload: data,
			})

			dispatch(removeAlert())
		}
	} catch (error) {
		processError(error, PRODUCT_CREATE_FAIL, dispatch)
	}
}

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		if (checkProductErrors(product, dispatch, PRODUCT_UPDATE_FAIL) === false) {
			dispatch({
				type: PRODUCT_UPDATE_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = configJsonAndAuth(userInfo)

			const { data } = await axios.put(`${API}/products/${product._id}`, product, config)

			dispatch({
				type: PRODUCT_UPDATE_SUCCESS,
				payload: data,
			})

			dispatch(removeAlert())
		}
	} catch (error) {
		processError(error, PRODUCT_UPDATE_FAIL, dispatch)
	}
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
	try {
		if (!review.rating) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload: 'Calificacion Requerida',
			})
		} else if (!review.comment) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload: 'Comentario Requerido',
			})
		} else {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = configJsonAndAuth(userInfo)

			await axios.post(`${API}/products/${productId}/reviews`, review, config)

			dispatch({
				type: PRODUCT_CREATE_REVIEW_SUCCESS,
			})
		}

		dispatch(removeAlert())
	} catch (error) {
		processError(error, PRODUCT_CREATE_REVIEW_FAIL, dispatch)
	}
}

export const listTopProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_TOP_REQUEST })

		const { data } = await axios.get(`${API}/products/top`)

		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data,
		})

		dispatch(removeAlert())
	} catch (error) {
		processError(error, PRODUCT_TOP_FAIL, dispatch)
	}
}
