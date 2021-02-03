import React from 'react'
import Link from 'next/link'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'

const Product = ({ product, currency, dollarValue }) => {
	const productImg = () => (
		<Link href={`/product/${product._id}`}>
			{product.countInStock === 0 ? (
				<div className="sold-out">
					<img src={`${product.images[0]}`} alt={product.name}></img>
					<span>Agotado</span>
				</div>
			) : (
				<img src={`${product.images[0]}`} alt={product.name}></img>
			)}
		</Link>
	)

	const productName = () => (
		<Link href={`/product/${product._id}`}>
			<span className="card-title">{product.name}</span>
		</Link>
	)

	const productBrandAndCategory = () => (
		<div className="card-info">
			<span className="brand">{product.brand}</span>
			<span className="category">{product.category}</span>
		</div>
	)

	const productPrice = () => (
		<div className="prices">
			<div className={product.discount ? 'card-price-red' : 'card-price'}>
				{currency === '$'
					? `${formatCurrency(product.price)}`
					: `${numberWithDots(Math.round(product.price * dollarValue).toFixed(0))} Bs`}
			</div>
			{product.discount ? (
				<div className="card-price">
					{currency === '$'
						? `${formatCurrency(product.price * ((100 - product.discount) / 100))}`
						: `${numberWithDots(
								Math.round(product.price * ((100 - product.discount) / 100) * dollarValue).toFixed(0)
						  )} Bs`}
				</div>
			) : (
				<></>
			)}
		</div>
	)

	const openProductButton = () => (
		<Link href={`/product/${product._id}`}>
			<span className="btn-icon btn-light">
				<i className="fas fa-plus"></i>
			</span>
		</Link>
	)

	const productDeals = () => (
		<>
			{product.deal && product.deal.amount ? (
				<div className="card-deals">
					<div className="deal">
						{product.deal.discount
							? `Compra ${product.deal.amount} y Recibe ${product.deal.discount}% de Descuento!`
							: ''}
						{product.deal.qtyFree
							? `Compra ${product.deal.amount} y Recibe ${product.deal.qtyFree} Gratis!`
							: ''}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
	return (
		<div className="card">
			{productImg()}

			<div className="card-body">
				{productName()}

				{productBrandAndCategory()}
				<div className="price-button">
					{productPrice()}

					{openProductButton()}
				</div>

				{productDeals()}
			</div>
		</div>
	)
}

export default Product
