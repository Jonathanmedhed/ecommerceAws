import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import Message from '../../../components/alerts/Message'
import Loader from '../../../components/loader/Loader'
import HtmlHeader from '../../../components/html-header/HtmlHeader'
// actions
import { createUser } from '../../../actions/userActions'
// constants
import { USER_REGISTER_RESET } from '../../../constants/userConstants'
import { APP_NAME } from '../../../config'

const UserEditScreen = ({ match }) => {
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

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, success } = userRegister

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			router.push('/login')
		}
		if (success) {
			dispatch({ type: USER_REGISTER_RESET })
			router.push('/admin/user-list')
		}
	}, [dispatch, router, success, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(createUser(name, email, password, confirmPassword, isAdmin))
	}

	const onChange = (e) => {
		dispatch({ type: USER_REGISTER_RESET })
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Crear Usuario`} />

	return (
		<div className="edit">
			{htmlHeader()}
			<h3>
				<i className="fas fa-user"></i> Crear Usuario
			</h3>
			<div>
				{loading ? (
					<Loader absolute={true} />
				) : (
					<>
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
									Crear
								</button>

								<Link href="/admin/user-list">
									<span className="btn btn-danger mt-half">Regresar</span>
								</Link>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	)
}

export default UserEditScreen
