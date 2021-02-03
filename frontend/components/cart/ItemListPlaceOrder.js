import React from 'react'
import PlaceOrderItem from '../product-place-order/PlaceOrderItem'
import Message from '../alerts/Message'

const ItemListPlaceOrder = ({ cart, shop }) => {
	return (
		<div className="info-item">
			<h2>
				<i className="fas fa-shopping-cart"></i> Articulos en Orden
			</h2>
			{cart.cartItems && cart.cartItems.length === 0 ? (
				<Message severity="warn" text={'Tu carro esta vacio'} />
			) : (
				<div className="item-list">
					{cart.cartItems &&
						cart.cartItems.map((item) => <PlaceOrderItem shop={shop} cart={cart} item={item} />)}
				</div>
			)}
		</div>
	)
}

export default ItemListPlaceOrder
