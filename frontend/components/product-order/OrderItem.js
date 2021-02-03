import React from 'react'
import Link from 'next/link'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'

const OrderItem = ({ item, order }) => {
	const itemQty = (item) => (
		<div className={item.freeAmount ? 'qty-top mr-half' : 'qty mr-half'}>
			{item.freeAmountQty ? (
				<span>{item.qty - item.freeAmountQty} x</span>
			) : item.discountDealAmount && item.qty !== item.discountDealAmountQty ? (
				<div className="qty-content">
					<span>{item.qty - item.discountDealAmountQty} x</span>
					<span>{item.discountDealAmountQty} x</span>
				</div>
			) : (
				<span>{item.qty} x</span>
			)}
		</div>
	)

	const mainPrice = (item) => (
		<span className={item.discountAmount || item.discountDealAmount ? 'price-value-red' : 'price-value'}>
			{order.paymentMethod === 'Efectivo'
				? `${formatCurrency(item.price)}`
				: `${numberWithDots(Math.round(item.price * order.dollarValue).toFixed(0))} Bs`}
		</span>
	)

	/** product discount and no deal discount */
	const discountPrice = (item) => (
		<>
			{item.discountAmount && !item.discountDealAmount ? (
				<span className="price-value">
					{order.paymentMethod === 'Efectivo'
						? `${formatCurrency(
								Number(item.price - item.discountAmount / item.discountAmountQty).toFixed(2)
						  )}`
						: `${numberWithDots(
								Math.round(
									Number(item.price - item.discountAmount / item.discountAmountQty) *
										order.dollarValue
								).toFixed(0)
						  )} Bs`}
				</span>
			) : (
				<></>
			)}
		</>
	)

	/** deal discount but no product discount */
	const discountDealPrice = (item) => (
		<>
			{!item.discountAmount && item.discountDealAmount ? (
				<span className="price-value">
					{order.paymentMethod === 'Efectivo'
						? `${formatCurrency(item.price - item.discountDealAmount / item.discountDealAmountQty)}`
						: `${numberWithDots(
								Math.round(
									(item.price - item.discountDealAmount / item.discountDealAmountQty) *
										order.dollarValue
								).toFixed(0)
						  )} Bs`}
				</span>
			) : (
				<></>
			)}
		</>
	)

	/** deal discount and product discount matches */
	const discountBothPrice = (item) => (
		<>
			{item.discountAmount && item.discountDealAmount ? (
				<>
					<span className="price-value-red">
						{order.paymentMethod === 'Efectivo'
							? `${formatCurrency(item.price - item.discountAmount / item.discountAmountQty)}`
							: `${numberWithDots(
									Math.round(
										(item.price - item.discountAmount / item.discountAmountQty) * order.dollarValue
									).toFixed(0)
							  )} Bs`}
					</span>
					<span className="price-value">
						{order.paymentMethod === 'Efectivo'
							? `${formatCurrency(
									item.price -
										item.discountAmount / item.discountAmountQty -
										item.discountDealAmount / item.discountDealAmountQty
							  )}`
							: `${numberWithDots(
									Math.round(
										(item.price -
											item.discountAmount / item.discountAmountQty -
											item.discountDealAmount / item.discountDealAmountQty) *
											order.dollarValue
									).toFixed(0)
							  )} Bs`}
					</span>
				</>
			) : (
				<></>
			)}
		</>
	)

	const priceQtyFree = (item) => (
		<>{item.freeAmountQty ? <span className="qty-free">+{item.freeAmountQty} Gratis</span> : <></>}</>
	)
	const itemPrice = (item) => (
		<div className="price">
			{mainPrice(item)}
			{discountPrice(item)}
			{discountDealPrice(item)}
			{discountBothPrice(item)}
			{priceQtyFree(item)}
		</div>
	)

	const itemTotal = (item) => (
		<div
			className={
				item.freeAmount
					? 'total-top ml-half'
					: item.discountAmount || item.discountDealAmount
					? 'total-end ml-half'
					: 'total ml-half'
			}
		>
			={' '}
			{order.paymentMethod === 'Efectivo'
				? `$${formatCurrency(
						Math.round(
							item.qty * item.price - (item.discountAmount + item.discountDealAmount + item.freeAmount)
						).toFixed(0)
				  )}`
				: `${numberWithDots(
						Math.round(
							(item.qty * item.price -
								(item.discountAmount + item.discountDealAmount + item.freeAmount)) *
								order.dollarValue
						).toFixed(0)
				  )} Bs`}
		</div>
	)

	return (
		<div className="item" key={item.product}>
			<div className="img">{item.images && <img src={item.images[0]} alt={item.name}></img>}</div>
			<div className="name">
				<Link href={`/product/${item.product}`}>{item.name}</Link>
			</div>
			<div className="amount">
				{itemQty(item)}
				{itemPrice(item)}
				{itemTotal(item)}
			</div>
		</div>
	)
}

export default OrderItem
