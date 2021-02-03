import React from 'react'
import Link from 'next/link'

const CheckoutSteps = ({ step1, step2, step3, step4, current }) => {
	return (
		<div className="steps">
			{/**!userInfo && (
				<div className={current === 1 ? 'item-highlighted' : 'item'}>
					{step1 ? (
						<Link href="/login">Iniciar Sesion</Link>
					) : (
						<div className="color-white-dark">Iniciar Sesion</div>
					)}
				</div>
			)*/}

			<div className={current === 2 ? 'item-highlighted' : 'item'}>
				{step2 ? <Link href="/cart/shipping">Envío</Link> : <div className="color-white-dark">Envío</div>}
			</div>

			<div className={current === 3 ? 'item-highlighted' : 'item'}>
				{step3 ? <Link href="/cart/payment">Pago</Link> : <div className="color-white-dark">Pago</div>}
			</div>

			<div className={current === 4 ? 'item-highlighted' : 'item'}>
				{step4 ? (
					<Link href="/cart/placeorder">Realizar Pedido</Link>
				) : (
					<div className="color-white-dark">Realizar Pedido</div>
				)}
			</div>
		</div>
	)
}

export default CheckoutSteps
