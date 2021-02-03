import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import Loader from '../../../components/loader/Loader'
import HtmlHeader from '../../../components/html-header/HtmlHeader'
import Error from '../../../components/error/Error'
// actions
import { getUserDetails, updateUser } from '../../../actions/userActions'
//constants
import { USER_UPDATE_RESET, USER_UPDATE_FAIL_RESET } from '../../../constants/userConstants'
import { APP_NAME } from '../../../config'

const UserEditScreen = ({ query }) => {
	const userId = query.id

	const router = useRouter()

	// Form Values
	const [formData, setFormData] = useState({
		name: '',
		password: '',
		confirmPassword: '',
		isAdmin: false,
		email: '',
	})

	// Form Values Variables
	const { name, password, confirmPassword, isAdmin, email } = formData

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			router.push('/login')
		}
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET })
			router.push('/admin/user-list')
		} else if (user && (!user.name || user._id !== userId)) {
			dispatch(getUserDetails(userId))
		} else if (user) {
			setFormData({
				...formData,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
			})
		}
	}, [dispatch, router, userId, user, successUpdate, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUser({ _id: userId, name, email, isAdmin }))
	}

	const onChange = (e) => {
		dispatch({ type: USER_UPDATE_FAIL_RESET })
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Editar Usuario`} />

	return (
		<div className="edit">
			{htmlHeader()}
			<h3>
				<i className="fas fa-user"></i> Modificar Usuario
			</h3>
			<div>
				{loadingUpdate ? (
					<Loader absolute={true} />
				) : (
					<>
						{loading ? (
							<Loader absolute />
						) : error ? (
							<Error />
						) : (
							<form onSubmit={submitHandler}>
								<div className="form-group">
									<label>Nombre</label>
									<input
										type="text"
										placeholder="Ingresar nombre"
										name="name"
										value={name}
										onChange={(e) => onChange(e)}
									></input>
								</div>

								<div className="form-group">
									<label>Correo Electrónico</label>
									<input
										type="email"
										placeholder="Ingresar email"
										name="email"
										value={email}
										onChange={(e) => onChange(e)}
									></input>
								</div>

								<div className="form-group">
									<label>Contraseña</label>
									<input
										type="password"
										placeholder="Ingresar contraseña"
										name="password"
										value={password}
										onChange={(e) => onChange(e)}
									></input>
								</div>

								<div className="form-group">
									<label>Confirmar Contraseña</label>
									<input
										type="password"
										placeholder="Confirmar contraseña"
										name="confirmPassword"
										value={confirmPassword}
										onChange={(e) => onChange(e)}
									></input>
								</div>

								<div className="form-group-hor">
									<label>Administrador</label>
									<input
										type="checkbox"
										checked={isAdmin}
										onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
									></input>
								</div>

								<div className="end-options">
									<button type="submit" className="btn btn-primary mt-half">
										Guardar Cambios
									</button>

									<Link href="/admin/user-list">
										<span className="btn btn-danger mt-half">Regresar</span>
									</Link>
								</div>
							</form>
						)}
					</>
				)}
			</div>
		</div>
	)
}

UserEditScreen.getInitialProps = ({ query }) => {
	return { query }
}

export default UserEditScreen
