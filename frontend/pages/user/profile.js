import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// components
import Error from '../../components/error/Error'
import Loader from '../../components/loader/Loader'
import HtmlHeader from '../../components/html-header/HtmlHeader'
import Message from '../../components/alerts/Message'
// actions
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
// constants
import { USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_FAIL_RESET } from '../../constants/userConstants'
import { APP_NAME } from '../../config'

const ProfileScreen = () => {
	const router = useRouter()

	// Form Values
	const [formData, setFormData] = useState({
		name: '',
		password: '',
		confirmPassword: '',
		email: '',
	})

	// Form Values Variables
	const { name, password, confirmPassword, email } = formData

	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { loading: loadingUpdate, error: errorUpdate, success } = userUpdateProfile

	useEffect(() => {
		if (!userInfo) {
			router.push('/login')
		} else {
			if (!user || !user.name || success || user._id !== userInfo._id) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET })
				dispatch(getUserDetails('profile'))
				if (success) {
					setMessage('Cuenta Editada')
				}
			} else {
				setFormData({
					...formData,
					email: user.email,
					name: user.name,
				})
			}
		}
	}, [dispatch, router, userInfo, user, success])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUserProfile({ id: user._id, name, email, password, confirmPassword }))
	}

	const onChange = (e) => {
		dispatch({ type: USER_UPDATE_PROFILE_FAIL_RESET })
		setMessage('')
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const formFields = () => (
		<>
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

			{/**
			<div className="form-group">
				<label>Correo Electrónico</label>
				<input
					type="email"
					placeholder="Ingresar email"
					value={email}
					name="email"
					onChange={(e) => onChange(e)}
				></input>
			</div>
			 */}

			<div className="form-group">
				<label>Contraseña</label>
				<input
					type="password"
					placeholder="Ingresar contraseña"
					value={password}
					name="password"
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Confirmar Contraseña</label>
				<input
					type="password"
					placeholder="Repite contraseña"
					value={confirmPassword}
					name="confirmPassword"
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Mi Cuenta`} />

	return (
		<div className="profile">
			{htmlHeader()}
			<h3>Mi Cuenta</h3>
			<div className="content">
				{loading || loadingUpdate ? (
					<Loader absolute={true} />
				) : (
					<div className="edit">
						{message && <Message severity="success" text={message} />}
						{error ? (
							<Error />
						) : (
							<form onSubmit={submitHandler}>
								{formFields()}
								<button type="submit" className="btn btn-primary mt-half">
									Modificar
								</button>
							</form>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProfileScreen
