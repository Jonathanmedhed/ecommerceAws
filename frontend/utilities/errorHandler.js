import { logout } from '../actions/userActions'
import { setAlert } from '../actions/alertActions'

export const connectionError =
	"Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/"

export const networkError = 'Network Error'

export const configJsonOrAuth = (userInfo) => {
	return userInfo
		? {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
		  }
		: {
				headers: {
					'Content-Type': 'application/json',
				},
		  }
}

export const configJsonAndAuth = (userInfo) => {
	return {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo.token}`,
		},
	}
}

export const configAuthOnly = (userInfo) => {
	return {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	}
}

export const configJsonOnly = () => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
	}
}

export const processError = (error, errorConstant, dispatch) => {
	try {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message
		if (message === 'Request failed with status code 500') {
			dispatch(setAlert('Error del servidor, intente luego', 'error'), 1000000)
			dispatch({
				type: errorConstant,
				payload: 'Error del servidor, intente luego',
			})
		} else if (message === 'Not authorized, token failed') {
			dispatch(logout())
			dispatch(setAlert('No autorizado, llave ha fallado', 'error'))
			dispatch({
				type: errorConstant,
				payload: 'No autorizado, llave ha fallado',
			})
		} else if (message === connectionError || message === networkError) {
			dispatch(setAlert('Error de conexión, por favor intente de nuevo', 'error', 1000000))
			dispatch({
				type: errorConstant,
				payload: 'Error de conexión, por favor intente de nuevo',
			})
		} else if (message === 'Not authorized as an admin') {
			dispatch({
				type: errorConstant,
				payload: 'No autorizado como administrador',
			})
		} else {
			dispatch(setAlert(message, 'error'))
			dispatch({
				type: errorConstant,
				payload: message,
			})
		}
	} catch (error) {
		console.log(error)
	}
}
