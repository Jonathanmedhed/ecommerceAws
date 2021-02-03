import React from 'react'
import ItemListPlaceOrder from './ItemListPlaceOrder'

const CartInfo = ({ cart, shop }) => {
	const addressInfo = () => (
		<>
			{cart.shippingAddress && cart.shippingAddress.address && (
				<div className="info-item">
					<h2>
						<i className="fas fa-truck"></i> Envío
					</h2>
					<p>
						<strong>Dirección: </strong>
						{cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
						{cart.shippingAddress.country}
					</p>
				</div>
			)}
		</>
	)

	const paymentMethodInfo = () => (
		<>
			<div className="info-item">
				<h2>
					<i className="fas fa-cash-register"></i> Método de Pago
				</h2>
				<p>{cart.paymentMethod}</p>
			</div>
		</>
	)

	return (
		<div className="order-info">
			{addressInfo()}
			{paymentMethodInfo()}
			<ItemListPlaceOrder cart={cart} shop={shop} />
		</div>
	)
}

export default CartInfo
