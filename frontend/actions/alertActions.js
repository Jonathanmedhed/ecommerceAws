import { v4 as uuid } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from '../constants/alertConstants'

export const setAlert = (msg, alertType, timeout = 4000) => (dispatch) => {
	// Set alert id
	const id = uuid
	// Remove current alerts
	dispatch({
		type: REMOVE_ALERT,
	})
	// Dispatch alert
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id },
	})
	// Remove alert after timeout
	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}

export const removeAlert = () => (dispatch) => {
	dispatch({
		type: REMOVE_ALERT,
	})
}
