import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import CheckoutSteps from '../../components/checkout-steps/CheckoutSteps'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { saveShippingAddress } from '../../actions/cartActions'
// constants
import { CART_REMOVE_SHIPPING_ADDRESS } from '../../constants/cartConstants'
import { APP_NAME } from '../../config'

const ShippingScreen = () => {
	const router = useRouter()

	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop } = shopDetails

	const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : null)
	const [city, setCity] = useState(shippingAddress ? shippingAddress.city : null)
	const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : null)
	const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : null)
	const [showOptions, setShowOptions] = useState(false)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		router.push('/cart/payment')
	}

	const setPickup = () => {
		dispatch({ type: CART_REMOVE_SHIPPING_ADDRESS })
		router.push('/cart/payment')
	}

	const shippingForm = () => (
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<label>Dirección</label>
				<input
					type="text"
					placeholder="Ingresar dirección"
					value={address}
					required
					onChange={(e) => setAddress(e.target.value)}
				></input>
			</div>

			<div className="form-group">
				<label>Ciudad</label>
				<input
					type="text"
					placeholder="Ingresar ciudad"
					value={city}
					required
					onChange={(e) => setCity(e.target.value)}
				></input>
			</div>

			<div className="form-group">
				<label>Código Postal</label>
				<input
					type="text"
					placeholder="Ingresar código postal"
					value={postalCode}
					required
					onChange={(e) => setPostalCode(e.target.value)}
				></input>
			</div>

			<div className="form-group">
				<label>Pais</label>
				<input
					type="text"
					placeholder="Ingresar país"
					value={country}
					required
					onChange={(e) => setCountry(e.target.value)}
				></input>
			</div>

			<button type="submit" className="btn btn-primary mt-1">
				Continuar
			</button>
		</form>
	)

	const loginOptions = () => (
		<div className="login-options">
			<h3 className="title">
				Prefiere <strong>retirar</strong> los productos en la tienda o que se los <strong>enviemos</strong>?
			</h3>
			{shop && shop.deliveryRules && shop.deliveryRules.length > 0 && (
				<ul className="info">
					<li>
						<strong>Condiciones para envío:</strong>
					</li>
					{shop.deliveryRules.map((rule) => (
						<li className="item" key={rule}>
							<i className="fas fa-circle"></i> <span className="ml-half">{rule}</span>
						</li>
					))}
				</ul>
			)}
			<div className="options">
				<div onClick={() => setPickup()} className="btn btn-primary">
					<i className="fas fa-store-alt mr-half"></i> Retiro
				</div>
				<span onClick={() => setShowOptions(true)} className="btn btn-dark">
					<i className="fas fa-truck-pickup mr-half"></i> Envío
				</span>
			</div>
		</div>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Envío`} />

	return (
		<div className="shipping">
			{htmlHeader()}
			<CheckoutSteps step1 step2 current={2} />
			<h1>{!showOptions ? 'Envío/Retiro' : 'Envío'}</h1>
			{showOptions ? <>{shippingForm()}</> : <>{loginOptions()}</>}
		</div>
	)
}

export default ShippingScreen
