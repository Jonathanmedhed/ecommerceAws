import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
// components
import CheckoutSteps from '../../components/checkout-steps/CheckoutSteps'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { savePaymentMethod } from '../../actions/cartActions'
// constants
import { APP_NAME } from '../../config'

const PaymentScreen = () => {
	/** 
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	if (!shippingAddress) {
		router.push('/shipping')
	}
	*/
	const router = useRouter()

	const [showOptions, setShowOptions] = useState(false)

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const dispatch = useDispatch()

	const submitHandler = (paymentMethod) => {
		dispatch(savePaymentMethod(paymentMethod))
		router.push('/cart/place-order')
	}

	const authOptions = () => (
		<>
			<form>
				<div className="form-group-hor">
					<span onClick={() => submitHandler('Pago Movil')} className="btn btn-success-dark">
						<i className="fas fa-mobile-alt mr-half"></i> Pago Móvil
					</span>
				</div>

				<div className="form-group-hor">
					<span onClick={() => submitHandler('Efectivo')} className="btn btn-success">
						<i className="fas fa-dollar-sign mr-half"></i> Efectivo
					</span>
				</div>
			</form>
		</>
	)

	const noAuthOptions = () => (
		<>
			<div className="login-options">
				<h3 className="title">
					Continuar como <strong>invitado</strong> o ingresar como <strong>usuario</strong>?
				</h3>
				<p className="info">
					Al ingresar podras llevar un registro de tu orden, ver el estado de aprobación, entrega y mucho
					mas...
				</p>
				<div className="options">
					<Link href={'/login?redirect=cart/payment'}>
						<span className="btn btn-primary">
							<i className="fas fa-sign-in-alt mr-half"></i> Ingresar
						</span>
					</Link>
					<span onClick={() => setShowOptions(true)} className="btn btn-dark">
						<i class="fas fa-glasses mr-half"></i> Continuar
					</span>
				</div>
			</div>
		</>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Método de Pago`} />

	return (
		<div className="shipping">
			{htmlHeader()}
			<CheckoutSteps step2 step3 current={3} />
			<h1>Método de Pago</h1>
			{userInfo || showOptions ? <>{authOptions()}</> : <>{noAuthOptions()}</>}
		</div>
	)
}

export default PaymentScreen
