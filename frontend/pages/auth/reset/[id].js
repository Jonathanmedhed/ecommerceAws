import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
// components
import Loader from '../../../components/loader/Loader'
import HtmlHeader from '../../../components/html-header/HtmlHeader'
// actions
import { resetPassword as resetPasswordAction } from '../../../actions/userActions'
import { shopDetails as getShopDetails } from '../../../actions/shopActions'
// constants
import { APP_NAME } from '../../../config'
import { RESET_PASSWORD_RESET } from '../../../constants/userConstants'

const ResetPassword = ({ query }) => {
	const router = useRouter()

	const [loaded, setLoaded] = useState(false)
	const [message, setMessage] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showForm, setShowForm] = useState(true)

	const dispatch = useDispatch()

	const resetPassword = useSelector((state) => state.resetPassword)
	const { loading, success } = resetPassword

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading: loadingShop } = shopDetails

	useEffect(() => {
		if (!shop) {
			dispatch(getShopDetails())
		}
		if (success) {
			setShowForm(false)
			setMessage('Ya puedes ingresar con tu nueva contraseña.')
			dispatch({ type: RESET_PASSWORD_RESET })
		}
	}, [shop, success])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(resetPasswordAction({ password, confirmPassword, resetPasswordLink: query.id }))
	}

	const onChangePasswords = (value, main) => {
		if (main) {
			setPassword(value)
		} else {
			setConfirmPassword(value)
		}
	}

	const resetPasswordForm = () => (
		<form onSubmit={submitHandler}>
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
				Enviar
			</button>
		</form>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Cambio de contraseña`} />

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
						src={shop && shop.image ? shop.image : require(`../../../static/images/home.jpg`)}
						alt="home"
					></img>
					<div className="content">
						<h3>Cambio de Contraseña</h3>
						{loading ? (
							<Loader />
						) : (
							<>
								{showForm ? (
									resetPasswordForm()
								) : (
									<p className="dialog-success">
										<p>{message}</p>
										<Link href="/login">
											<button className="btn btn-primary mt-half">Ingresar</button>
										</Link>
									</p>
								)}
							</>
						)}
					</div>
				</div>
			)}
		</>
	)
}

ResetPassword.getInitialProps = ({ query }) => {
	return { query }
}

export default ResetPassword
