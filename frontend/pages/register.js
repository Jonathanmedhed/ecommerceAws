import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import Loader from '../components/loader/Loader'
import HtmlHeader from '../components/html-header/HtmlHeader'
// actions
import { preRegister as preRegisterAction } from '../actions/userActions'
import { shopDetails as getShopDetails } from '../actions/shopActions'
// constants
import { PRE_REGISTER_RESET } from '../constants/userConstants'
import { APP_NAME } from '../config'

const RegisterScreen = ({ query }) => {
	const router = useRouter()

	const [loaded, setLoaded] = useState(false)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showForm, setShowForm] = useState(true)
	const [message, setMessage] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const preRegister = useSelector((state) => state.preRegister)
	const { loading, success } = preRegister

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading: loadingShop } = shopDetails

	const redirect = query && query.redirect ? query.redirect : '/'

	useEffect(() => {
		if (userInfo) {
			router.push(redirect)
		}
		if (!shop) {
			dispatch(getShopDetails())
		}
		if (success) {
			setMessage('Correo de confirmación enviado, revisa tu buzón y activa tu cuenta.')
			setShowForm(false)
			dispatch({ type: PRE_REGISTER_RESET })
		}
	}, [router, userInfo, redirect, shop, success])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(preRegisterAction(name, email, password, confirmPassword))
	}

	const onChangeEmail = (value) => {
		dispatch({ type: PRE_REGISTER_RESET })
		setEmail(value)
	}

	const onChangePasswords = (value, main) => {
		dispatch({ type: PRE_REGISTER_RESET })
		if (main) {
			setPassword(value)
		} else {
			setConfirmPassword(value)
		}
	}

	const registerForm = () => (
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<label>Nombre</label>
				<input
					type="text"
					placeholder="Ingresar nombre"
					value={name}
					onChange={(e) => setName(e.target.value)}
				></input>
			</div>

			<div className="form-group">
				<label>Correo Electrónico</label>
				<input
					type="email"
					placeholder="Ingresar email"
					value={email}
					onChange={(e) => onChangeEmail(e.target.value)}
				></input>
			</div>

			<div className="form-group">
				<label>Contraseña</label>
				<input
					type="password"
					placeholder="Ingresar contraseña"
					value={password}
					onChange={(e) => onChangePasswords(e.target.value, true)}
				></input>
			</div>

			<div className="form-group">
				<label>Confirmar Contraseña</label>
				<input
					type="password"
					placeholder="Confirmar contraseña"
					value={confirmPassword}
					onChange={(e) => onChangePasswords(e.target.value)}
				></input>
			</div>

			<button type="submit" className="btn btn-primary mt-1">
				Registrar
			</button>
		</form>
	)

	const alreadyUserMessage = () => (
		<div className="message">
			Tienes Cuenta? <Link href={redirect ? `/login?redirect=${redirect}` : '/login'}>Ingresa</Link>
		</div>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Registro`} />

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
						src={shop && shop.image ? shop.image : require(`../static/images/home.jpg`)}
						alt="home"
					></img>
					<div className="content">
						<h3>Registro</h3>
						{loading ? (
							<Loader />
						) : (
							<>
								{showForm ? (
									<>
										{registerForm()}
										{alreadyUserMessage()}
									</>
								) : (
									<p className="dialog-success">{message}</p>
								)}
							</>
						)}
					</div>
				</div>
			)}
		</>
	)
}

RegisterScreen.getInitialProps = ({ query }) => {
	return { query }
}

export default RegisterScreen
