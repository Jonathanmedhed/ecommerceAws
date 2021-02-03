import axios from 'axios'
import { API } from '../config'

export const addMapScript = async (setMapReady) => {
	// Check if script already set
	const scriptExists = document.getElementById('gmap')
	// if not, create it
	if (!scriptExists) {
		const { data: key } = await axios.get(`${API}/config/gmap`)
		const script = document.createElement('script')
		script.id = 'gmap'
		script.type = 'text/javascript'
		script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`
		script.async = true
		script.onload = () => {
			setMapReady(true)
		}
		document.body.appendChild(script)
	} else {
		setMapReady(true)
	}
}
