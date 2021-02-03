import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'
import { addToCart } from '../../actions/cartActions'

const CartItem = ({ item, changeCurrency, shop, removeFromCartHandler }) => {
	const dispatch = useDispatch()

	const onDeal = (item) => (
		<>
			{item.deal && item.deal.amount ? (
				<div className="deals">
					<div className="deal">
						{item.deal.discount && item.deal.discount > 0 && item.discountDealAmount === 0
							? `Compra ${item.deal.amount} y Recibe ${item.deal.discount}% de Descuento!`
							: item.deal.discount && item.deal.discount > 0
							? `Estas recibiendo ${item.deal.discount}% de descuento en (${item.discountDealAmountQty}) producto(s)!`
							: ''}
						{item.deal.qtyFree && item.deal.qtyFree > 0 && item.freeAmount === 0
							? `Por cada ${item.deal.amount} Recibe ${item.deal.qtyFree} Gratis!`
							: item.deal.qtyFree && item.deal.qtyFree > 0
							? `Recibiras ${item.freeAmountQty} articulo(s) Gratis!`
							: ''}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)

	const onDiscount = (item) => (
		<>
			{item.discount ? (
				<div className="deals">
					{item.discount && (
						<div className="deal">
							{`Estas recibiendo ${item.discount}% de descuento en (${item.discountAmountQty}) producto(s)!`}
						</div>
					)}
				</div>
			) : (
				<></>
			)}
		</>
	)

	/** First price to be shown */
	const mainPrice = (item) => (
		<span
			className={
				item.discount || (item.deal && item.deal.discount && item.qty >= item.deal.amount)
					? 'price-value-red'
					: 'price-value'
			}
		>
			{!changeCurrency
				? `${formatCurrency(item.price)}`
				: `${numberWithDots(Math.round(item.price * shop.dollarValue).toFixed(0))} Bs`}
		</span>
	)

	/** product discount and no deal discount */
	const priceOnDiscount = (item) => (
		<>
			{item.discount && !(item.deal && item.deal.discount) ? (
				<span className="price-value">
					{!changeCurrency
						? `${formatCurrency(
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

	/** deal discount but no product discount */
	const priceOnDealDiscount = (item) => (
		<>
			{!item.discount && item.deal && item.deal.discount && item.qty >= item.deal.amount ? (
				<span className="price-value">
					{!changeCurrency
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
	/** deal discount and product discount matches */
	const priceOnBothDiscounts = (item) => (
		<>
			{item.discount && item.deal && item.deal.discount && item.qty >= item.deal.amount ? (
				<>
					<span className="price-value-red">
						{!changeCurrency
							? `${formatCurrency(item.price - item.discountAmount / item.discountAmountQty)}`
							: `${numberWithDots(
									Math.round(
										(item.price - item.discountAmount / item.discountAmountQty) * shop.dollarValue
									).toFixed(0)
							  )} Bs`}
					</span>
					<span className="price-value">
						{!changeCurrency
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
	/** deal discount and product discount doesnt match */
	const priceOnDealNoMatch = (item) => (
		<>
			{item.discount && item.deal && item.deal.discount && !(item.qty >= item.deal.amount) ? (
				<span className="price-value">
					{!changeCurrency
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

	const price = (item) => (
		<div className="price">
			{mainPrice(item)}
			{priceOnDiscount(item)}
			{priceOnDealDiscount(item)}
			{priceOnBothDiscounts(item)}
			{priceOnDealNoMatch(item)}
		</div>
	)

	const qtyInput = (item) => (
		<div className="form">
			<select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
				{[...Array(item.countInStock).keys()].map((x) => (
					<option key={x + 1} value={x + 1}>
						{x + 1}
					</option>
				))}
			</select>
		</div>
	)

	return (
		<>
			{onDeal(item)}
			{onDiscount(item)}
			<div className="item" key={item.product}>
				<div className="img">{item.images && <img src={item.images[0]} alt={item.name}></img>}</div>
				<div className="name">
					<Link href={`/product/${item.product}`}>{item.name}</Link>
				</div>
				{price(item)}
				{qtyInput(item)}
				<div class="option">
					<button className="btn btn-danger" onClick={() => removeFromCartHandler(item.product)}>
						<i className="fas fa-trash"></i>
					</button>
				</div>
			</div>
		</>
	)
}

export default CartItem
