import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import Loader from '../components/loader/Loader'
import HtmlHeader from '../components/html-header/HtmlHeader'
// actions
import { login } from '../actions/userActions'
import { shopDetails as getShopDetails } from '../actions/shopActions'
// constants
import { USER_LOGIN_RESET } from '../constants/userConstants'
import { APP_NAME } from '../config'
import LoginGoogle from '../components/auth/LoginGoogle'

const LoginScreen = ({ query }) => {
	const router = useRouter()

	const [loaded, setLoaded] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

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
	}, [router, userInfo, redirect, shop])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	const onChangeEmail = (value) => {
		dispatch({ type: USER_LOGIN_RESET })
		setEmail(value)
	}

	const loginForm = () => (
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<label>Dirección de Correo</label>
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
					onChange={(e) => setPassword(e.target.value)}
				></input>
			</div>

			<button type="submit" className="btn btn-primary mt-half">
				Ingresar
			</button>

			<LoginGoogle />
		</form>
	)

	const notUserMessage = () => (
		<div className="message">
			Usuario Nuevo? <Link href={redirect ? `/register?redirect=${redirect}` : '/register'}>Regístrate</Link>
		</div>
	)

	const forgotPassword = () => (
		<div className="message-vert">
			<span>Has olvidado tu contraseña?</span> <Link href={'auth/forgot'}>Recuperar</Link>
		</div>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Iniciar Sesión`} />

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
						<h3>Iniciar Sesión</h3>
						{loginForm()}
						{notUserMessage()}
						{forgotPassword()}
					</div>
				</div>
			)}
		</>
	)
}

LoginScreen.getInitialProps = ({ query }) => {
	return { query }
}

export default LoginScreen
