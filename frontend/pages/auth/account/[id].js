import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { withRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader'
import HtmlHeader from '../../../components/html-header/HtmlHeader'
import { register } from '../../../actions/userActions'
import { APP_NAME } from '../../../config'
import { ORDER_CANCEL_SUCCESS } from '../../../constants/orderConstants'

const ActivateAccount = ({ router }) => {
	const dispatch = useDispatch()

	const [loaded, setLoaded] = useState(false)
	const [values, setValues] = useState({
		name: '',
		token: '',
		showForm: true,
		message: '',
	})

	const { name, token, showForm, message } = values

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, success } = userRegister

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading: loadingShop } = shopDetails

	useEffect(() => {
		let token = router.query.id
		if (token) {
			const { name } = jwt.decode(token)
			setValues({ ...values, name, token })
		}
		if (success) {
			setValues({ ...values, message: 'Tu cuenta ha sido activada.', showForm: false })
		}
		if (userInfo) {
			router.push('/')
		}
	}, [router, success, userInfo])

	const clickSubmit = (e) => {
		e.preventDefault()
		dispatch(register(token))
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Activar Cuenta`} />

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
						<h3>Activación</h3>
						{loading ? (
							<Loader />
						) : (
							<>
								{showForm ? (
									<>
										<form onSubmit={clickSubmit}>
											<div className="form-group">
												<label>
													Hola <span className="text-dark">{name}</span>, Listo para activar
													tu cuenta?
												</label>
											</div>

											<button type="submit" className="btn btn-primary mt-1">
												Activar Cuenta
											</button>
										</form>
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

export default withRouter(ActivateAccount)
