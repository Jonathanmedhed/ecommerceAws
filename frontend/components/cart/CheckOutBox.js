import React from 'react'
import Link from 'next/link'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'

const CheckOutBox = ({ shop, cart, cartItems, changeCurrency, checkoutHandler }) => {
	const totalDiscount = () => (
		<>
			{cart.discountTotal > 0 && (
				<>
					<h3>
						Descuentos (
						{cartItems.reduce(
							(acc, item) =>
								acc +
								(item.discountAmount > 0 || item.discountDealAmount > 0
									? item.discountDealAmountQty + item.discountAmountQty
									: 0),
							0
						)}
						)
					</h3>
					<div className="amount-free">
						{!changeCurrency
							? `$${formatCurrency(
									cartItems
										.reduce((acc, item) => acc + item.discountAmount + item.discountDealAmount, 0)
										.toFixed(2)
							  )}`
							: `${numberWithDots(
									Math.round(
										cartItems.reduce(
											(acc, item) => acc + item.discountAmount + item.discountDealAmount,
											0
										) * shop.dollarValue
									).toFixed(0)
							  )} Bs`}
					</div>
				</>
			)}
		</>
	)

	const totalFreeAmount = () => (
		<>
			{cart.freeAmount > 0 && (
				<>
					<h3>
						Articulos (
						{cartItems.reduce((acc, item) => acc + (item.freeAmountQty > 0 ? item.freeAmountQty : 0), 0)})
						Gratis
					</h3>
					<div className="amount-free">
						{!changeCurrency
							? `$${formatCurrency(cartItems.reduce((acc, item) => acc + item.freeAmount, 0).toFixed(2))}`
							: `${numberWithDots(
									Math.round(
										cartItems.reduce((acc, item) => acc + item.freeAmount, 0) * shop.dollarValue
									).toFixed(0)
							  )} Bs`}
					</div>
				</>
			)}
		</>
	)

	const subTotal = () => (
		<>
			<h3>
				Sub-total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}){' '}
				{cartItems.reduce((acc, item) => acc + item.qty, 0) === 1 ? 'item' : 'items'}
			</h3>
			<div className="amount">
				{cart.discountTotal > 0 || cart.freeAmount > 0 ? (
					<>
						<span className="red-dash">
							{!changeCurrency
								? `$${formatCurrency(cart.subTotal)}`
								: `${numberWithDots(Math.round(cart.subTotal * shop.dollarValue).toFixed(0))} Bs`}
						</span>
						<span>
							{!changeCurrency
								? `$${formatCurrency(cart.total)}`
								: `${numberWithDots(Math.round(cart.total * shop.dollarValue).toFixed(0))} Bs`}
						</span>
					</>
				) : (
					<>
						{!changeCurrency
							? `$${formatCurrency(cart.total)}`
							: `${numberWithDots(Math.round(cart.total * shop.dollarValue).toFixed(0))} Bs`}
					</>
				)}
			</div>
		</>
	)

	return (
		<>
			{cartItems && cartItems.length > 0 && (
				<>
					<div className="checkout">
						<div className="sub-total">
							{totalDiscount()}
							{totalFreeAmount()}
							{subTotal()}
						</div>
						<button className="btn btn-primary" disabled={cartItems.length === 0} onClick={checkoutHandler}>
							Realizar Pedido
						</button>
						<Link href="/product-selection">
							<span className="btn btn-danger mt-1">Continuar Comprando</span>
						</Link>
					</div>
				</>
			)}
		</>
	)
}

export default CheckOutBox
