import { SET_ALERT, REMOVE_ALERT } from '../constants/alertConstants'

export const alertReducer = (state = [], action) => {
	switch (action.type) {
		case SET_ALERT:
			return [...state, action.payload]
		case REMOVE_ALERT:
			return []
		default:
			return state
	}
}
