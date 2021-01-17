import axios from 'axios'
import { SEND_EMAIL_FAIL, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from '../constants/constants'
import { API } from '../config'

const connectionError =
	"Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/"

const networkError = 'Network Error'

export const sendEmail = (email, subject, text) => async (dispatch) => {
	try {
		dispatch({
			type: SEND_EMAIL_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const emailToSend = {
			from: '',
			to: email,
			subject: subject,
			text: text,
		}

		const { data } = await axios.post(`${API}/email/send-email`, { emailToSend }, config)

		dispatch({
			type: SEND_EMAIL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message
		if (message === 'Request failed with status code 500') {
			dispatch({
				type: SEND_EMAIL_FAIL,
				payload: 'Error del servidor, intente luego',
			})
		} else if (message === connectionError || message === networkError) {
			dispatch({
				type: SEND_EMAIL_FAIL,
				payload: message,
			})
		} else {
			dispatch({
				type: SEND_EMAIL_FAIL,
				payload: message,
			})
		}
	}
}
