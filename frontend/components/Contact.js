import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
// Actions
import { sendEmail as sendEmailAction } from '../actions/emailActions'

const Contact = ({ contactRef }) => {
	const dispatch = useDispatch()

	const [alert, setAlert] = useState(null)

	const sendEmail = useSelector((state) => state.sendEmail)
	const { loading, error, success } = sendEmail

	// Form Values
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	// Form Values Variables
	const { name, email, message } = formData

	const onChange = (e) => {
		setAlert(null)
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const sendEmailHandler = () => {
		setAlert(null)
		if (!name) {
			setAlert('Nombre Requerido')
		} else if (!email) {
			setAlert('Correo Requerido')
		} else if (!message) {
			setAlert('Mensaje Requerido')
		} else {
			let emailToSend = 'Usuario: ' + name + '\n' + '\n' + `Email: ` + email + '\n' + '\n' + message + ''

			dispatch(sendEmailAction('jonathanmedhed@gmail.com', `heddrich IT Solutions`, emailToSend))
		}
	}

	return (
		<section ref={contactRef} className="contact-section">
			{success ? (
				<div className="success-info">
					<h2>Gracias por Contactarnos</h2>
					<p>Te estaremos contactando muy pronto.</p>
				</div>
			) : (
				<>
					<h2>Contáctanos</h2>
					<p>Quieres una página? Tienes preguntas? Escríbenos</p>
					<form>
						<div className="form-group">
							<label>Nombre</label>
							<input
								type="name"
								placeholder="Ingresar nombre"
								value={name}
								name="name"
								onChange={(e) => onChange(e)}
							></input>
						</div>

						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								placeholder="Ingresar email"
								value={email}
								name="email"
								onChange={(e) => onChange(e)}
							></input>
						</div>

						<div className="form-group">
							<label>Mensaje</label>
							<textarea
								placeholder="Ingresar mensaje"
								value={message}
								name="message"
								onChange={(e) => onChange(e)}
								rows={6}
							></textarea>
						</div>
						{loading ? (
							<Loader />
						) : (
							<div onClick={() => sendEmailHandler()} className="btn btn-primary mt-1">
								Enviar
							</div>
						)}
						{alert ? <span className="error-msg">{alert}</span> : <></>}
						{error ? <span className="error-msg">{error}</span> : <></>}
						{success ? <span className="success-msg">Mensaje Enviado</span> : <></>}
					</form>
				</>
			)}
		</section>
	)
}

export default Contact
