import React from 'react'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'

const SummaryBreakdown = ({ order, shop, isPagoMovil, isDelivery }) => {
	const summaryItems = () => (
		<div className="item">
			<div className="label">Articulos</div>
			<div className="value">
				{!isPagoMovil
					? `$${formatCurrency(order.itemsPrice)}`
					: `${numberWithDots(Math.round(order.itemsPrice * order.dollarValue).toFixed(0))} Bs`}
			</div>
		</div>
	)

	const summaryDiscount = () => (
		<>
			{order && order.totalDiscount ? (
				<div className="item">
					<div className="label">Descuento</div>
					<div className="value-free">
						{!isPagoMovil
							? `${formatCurrency(order.totalDiscount)}`
							: `${numberWithDots(Math.round(order.totalDiscount * order.dollarValue).toFixed(0))} Bs`}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)

	const summaryDelivery = () => (
		<>
			{isDelivery && (
				<div className="item">
					<div className="label">Envio</div>
					<div className="value-less">
						{!isPagoMovil
							? `${formatCurrency(order.shippingPrice)}`
							: `${numberWithDots(Math.round(order.shippingPrice * order.dollarValue).toFixed(0))} Bs`}
					</div>
				</div>
			)}
		</>
	)

	const summaryTax = () => (
		<>
			{shop.taxPercentage && shop.taxPercentage > 0 && isPagoMovil ? (
				<div className="item">
					<div className="label">IVA</div>
					<div className="value-less">
						{!isPagoMovil
							? `${formatCurrency(order.taxPrice)}`
							: `${numberWithDots(Math.round(order.taxPrice * order.dollarValue).toFixed(0))} Bs`}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)

	const summaryTotal = () => (
		<div className="item">
			<div className="label">Total</div>
			<div className="value-total">
				<strong>
					{!isPagoMovil
						? `${formatCurrency(order.totalPrice)}`
						: `${numberWithDots(Math.round(order.totalPrice * order.dollarValue).toFixed(0))} Bs`}
				</strong>
			</div>
		</div>
	)

	return (
		<>
			{summaryItems()}
			{summaryDiscount()}
			{summaryDelivery()}
			{summaryTax()}
			{summaryTotal()}
		</>
	)
}

export default SummaryBreakdown
