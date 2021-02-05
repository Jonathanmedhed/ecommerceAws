import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { APP_NAME } from '../../config'
import { forgotPassword } from '../../actions/userActions'
import HtmlHeader from '../../components/html-header/HtmlHeader'
import Loader from '../../components/loader/Loader'
// constants
import { SEND_RECOVER_RESET } from '../../constants/userConstants'

const ForgotPassword = () => {
	const dispatch = useDispatch()

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading: loadingShop } = shopDetails

	const sendRecover = useSelector((state) => state.sendRecover)
	const { success, loading } = sendRecover

	const [loaded, setLoaded] = useState(false)
	const [values, setValues] = useState({
		email: '',
		showForm: true,
		message: '',
	})

	const { email, showForm, message } = values

	const handleChange = (name) => (e) => {
		setValues({ ...values, message: '', [name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(forgotPassword(email))
	}

	const passwordForgotForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group center-align">
				<label>Dirección de Correo</label>
				<input
					type="email"
					className="mt-half"
					onChange={handleChange('email')}
					value={email}
					placeholder="Ingrese su correo"
					required
				/>
			</div>
			<button className="btn btn-primary mt-1">Enviar enlace</button>
		</form>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Recuperar contraseña`} />

	useEffect(() => {
		if (success) {
			setValues({
				...values,
				message: 'Revisa tu correo y accede al enlace recibido para continuar el proceso',
				showForm: false,
			})
			dispatch({ type: SEND_RECOVER_RESET })
		}
	}, [success])
	return (
		<>
			{htmlHeader()}
			{loadingShop ? (
				<Loader absolute={true} />
			) : (
				<div className="login" style={loaded ? {} : { display: 'none' }}>
					<img
						onLoad={() => setLoaded(true)}
						className="home-image"
						src={shop && shop.image ? shop.image : require(`../../static/images/home.jpg`)}
						alt="home"
					></img>
					<div className="content">
						<h3>Recuperar Contraseña</h3>
						{loading ? (
							<Loader />
						) : (
							<>{showForm ? passwordForgotForm() : <p className="dialog-success">{message}</p>} </>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default ForgotPassword
