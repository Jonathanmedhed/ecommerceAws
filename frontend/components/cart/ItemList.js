import React from 'react'
import Link from 'next/link'
import Message from '../alerts/Message'
import CartItem from '../product-cart/CartItem'

const ItemList = ({ items, changeCurrency, shop, removeFromCartHandler }) => {
	return (
		<div className="cart-items">
			{items && items.length === 0 ? (
				<Message
					severity="info"
					text={
						<div>
							Carro vacío <Link href="/product-selection">Regresar</Link>
						</div>
					}
				/>
			) : (
				items && (
					<div className="items-list">
						{items.map((item) => (
							<CartItem
								item={item}
								changeCurrency={changeCurrency}
								shop={shop}
								removeFromCartHandler={removeFromCartHandler}
							/>
						))}
					</div>
				)
			)}
		</div>
	)
}

export default ItemList
