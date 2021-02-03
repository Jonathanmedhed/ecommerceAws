import React from 'react'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'

const CheckOutPlaceOrderBox = ({ cart, shop }) => {
	const checkOutItems = () => (
		<div className="item">
			<div className="label">Articulos</div>
			<div className="value">
				{cart.paymentMethod === 'Efectivo'
					? `$${formatCurrency(cart.itemsPrice)}`
					: `${numberWithDots(Math.round(cart.itemsPrice * shop.dollarValue).toFixed(0))} Bs`}
			</div>
		</div>
	)

	const checkOutDiscount = () => (
		<>
			{(cart.freeAmount > 0 || cart.discountTotal > 0) && (
				<div className="item">
					<div className="label">Descuentos</div>
					<div className="value-free">
						{cart.paymentMethod === 'Efectivo'
							? `-${formatCurrency(Number(cart.freeAmount) + Number(cart.discountTotal))}`
							: `-${numberWithDots(
									Math.round(
										(Number(cart.freeAmount) + Number(cart.discountTotal)) * shop.dollarValue
									).toFixed(0)
							  )} Bs`}
					</div>
				</div>
			)}
		</>
	)

	const checkOutShipping = () => (
		<>
			{cart.shippingAddress && cart.shippingAddress.address && (
				<div className="item">
					<div className="label">Envio</div>
					<div className="value-less">
						{cart.paymentMethod === 'Efectivo'
							? `${formatCurrency(cart.shippingPrice)}`
							: `${numberWithDots(Math.round(cart.shippingPrice * shop.dollarValue).toFixed(0))} Bs`}
					</div>
				</div>
			)}
		</>
	)

	const checkOutTax = () => (
		<>
			{shop.taxPercentage && shop.taxPercentage > 0 && cart.paymentMethod === 'Pago Movil' ? (
				<div className="item">
					<div className="label">IVA</div>
					<div className="value-less">
						{cart.paymentMethod === 'Efectivo'
							? `$${formatCurrency(cart.taxPrice)}`
							: `${numberWithDots(Math.round(cart.taxPrice * shop.dollarValue).toFixed(0))} Bs`}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)

	const checkOutTotal = () => (
		<div className="item">
			<div className="label">Total</div>
			<div className="value-total">
				<strong>
					{cart.paymentMethod === 'Efectivo'
						? `$${formatCurrency(cart.totalPrice)}`
						: `${numberWithDots(Math.round(cart.totalPrice * shop.dollarValue).toFixed(0))} Bs`}
				</strong>
			</div>
		</div>
	)

	return (
		<>
			{checkOutItems()}
			{checkOutDiscount()}
			{checkOutShipping()}
			{checkOutTax()}
			{checkOutTotal()}
		</>
	)
}

export default CheckOutPlaceOrderBox
