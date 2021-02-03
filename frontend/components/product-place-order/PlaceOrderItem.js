import React from 'react'
import Link from 'next/link'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'

const PlaceOrderItem = ({ item, cart, shop }) => {
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
		<span
			className={
				item.discount || (item.deal && item.deal.discount && item.qty >= item.deal.amount)
					? 'price-value-red'
					: 'price-value'
			}
		>
			{cart.paymentMethod === 'Efectivo'
				? `${formatCurrency(item.price)}`
				: `${numberWithDots(Math.round(item.price * shop.dollarValue).toFixed(0))} Bs`}
		</span>
	)

	const priceOnDiscount = (item) => (
		<>
			{item.discount && !(item.deal && item.deal.discount) ? (
				<span className="price-value">
					{cart.paymentMethod === 'Efectivo'
						? `$${formatCurrency(
								Number(item.price - item.discountAmount / item.discountAmountQty).toFixed(2)
						  )}`
						: `${numberWithDots(
								Math.round(
									Number(item.price - item.discountAmount / item.discountAmountQty) * shop.dollarValue
								).toFixed(0)
						  )} Bs`}
				</span>
			) : (
				<></>
			)}
		</>
	)

	const priceOnDealDiscount = (item) => (
		<>
			{!item.discount && item.deal && item.deal.discount && item.qty >= item.deal.amount ? (
				<span className="price-value">
					{cart.paymentMethod === 'Efectivo'
						? `${formatCurrency(item.price - item.discountDealAmount / item.discountDealAmountQty)}`
						: `${numberWithDots(
								Math.round(
									(item.price - item.discountDealAmount / item.discountDealAmountQty) *
										shop.dollarValue
								).toFixed(0)
						  )} Bs`}
				</span>
			) : (
				<></>
			)}
		</>
	)

	const priceOnBothDiscounts = (item) => (
		<>
			{item.discount && item.deal && item.deal.discount && item.qty >= item.deal.amount ? (
				<>
					<span className="price-value-red">
						{cart.paymentMethod === 'Efectivo'
							? `${formatCurrency(item.price - item.discountAmount / item.discountAmountQty)}`
							: `${numberWithDots(
									Math.round(
										(item.price - item.discountAmount / item.discountAmountQty) * shop.dollarValue
									).toFixed(0)
							  )} Bs`}
					</span>
					<span className="price-value">
						{cart.paymentMethod === 'Efectivo'
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
											shop.dollarValue
									).toFixed(0)
							  )} Bs`}
					</span>
				</>
			) : (
				<></>
			)}
		</>
	)

	const priceOnBothNoMatch = (item) => (
		<>
			{item.discount && item.deal && item.deal.discount && !(item.qty >= item.deal.amount) ? (
				<span className="price-value">
					{cart.paymentMethod === 'Efectivo'
						? `${formatCurrency(item.price - item.discountAmount)}`
						: `${numberWithDots(
								Math.round((item.price - item.discountAmount) * shop.dollarValue).toFixed(0)
						  )} Bs`}
				</span>
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
			{/** product discount and no deal discount */}
			{priceOnDiscount(item)}
			{/** deal discount but no product discount */}
			{priceOnDealDiscount(item)}
			{/** deal discount and product discount matches */}
			{priceOnBothDiscounts(item)}
			{/** deal discount and product discount doesnt match */}
			{priceOnBothNoMatch(item)}
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
			{cart.paymentMethod === 'Efectivo'
				? `$${formatCurrency(
						Math.round(
							item.qty * item.price - (item.discountAmount + item.discountDealAmount + item.freeAmount)
						).toFixed(0)
				  )}`
				: `${numberWithDots(
						Math.round(
							(item.qty * item.price -
								(item.discountAmount + item.discountDealAmount + item.freeAmount)) *
								shop.dollarValue
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

export default PlaceOrderItem
