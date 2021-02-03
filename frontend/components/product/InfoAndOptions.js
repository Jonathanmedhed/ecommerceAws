import React from 'react'
import { InputNumber } from 'primereact/inputnumber'
import CurrencySwitch from '../../components/currency-switch/CurrencySwitch'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'

const InfoAndOptions = ({ product, changeCurrency, setChangeCurrency, shop, qty, setQty, addToCartHandler }) => {
	const generalInfo = (product) => (
		<>
			<h3 className="info-name">{product.name}</h3>
			<div className="info-more">
				<span className="brand">{product.brand}</span>
				<span className="category">{product.category}</span>
			</div>
			<div className="info-description">
				<strong>Descripción:</strong> {product.description}
			</div>
		</>
	)

	const currencySwitchContainer = () => (
		<div className="status-item">
			<div className="title"></div>
			<div className="value">
				<CurrencySwitch value={changeCurrency} setValue={setChangeCurrency} />
			</div>
		</div>
	)

	const priceContainer = (product) => (
		<div className="status-item">
			<div className="title">Precio:</div>
			<div className="value-price">
				{product && shop ? (
					<span className={product.discount ? 'price-red' : 'price'}>
						{!changeCurrency
							? `${formatCurrency(product.price)}`
							: `${numberWithDots(Math.round(product.price * shop.dollarValue).toFixed(0))} Bs`}
					</span>
				) : (
					<></>
				)}
				{product && shop && product.discount ? (
					<span className="price">
						{!changeCurrency
							? `${formatCurrency(product.price * ((100 - product.discount) / 100))}`
							: `${numberWithDots(
									Math.round(
										product.price * ((100 - product.discount) / 100) * shop.dollarValue
									).toFixed(0)
							  )} Bs`}
					</span>
				) : (
					<></>
				)}
			</div>
		</div>
	)

	const stockContainer = (product) => (
		<>
			<div className="status-item">
				<div className="title">Estado:</div>
				<div className={product.countInStock > 0 ? 'value-success' : 'value-danger'}>
					{product.countInStock > 0 ? 'Disponible' : 'Agotado'}
				</div>
			</div>
			{product.countInStock > 0 && (
				<div className="status-item">
					<div className="title">Inventario Disponible:</div>
					<div className="value">{product.countInStock}</div>
				</div>
			)}
		</>
	)

	const qtyInputContainer = (product) => (
		<>
			{product.countInStock > 0 && (
				<div className="cart-options">
					<div className="title">Cantidad</div>
					<div className="qty">
						<InputNumber
							min={1}
							max={product.countInStock}
							name="qty"
							value={qty}
							onValueChange={(e) => setQty(e.target.value)}
							showButtons
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-danger"
							incrementButtonClassName="p-button-success"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
						/>
					</div>
				</div>
			)}
		</>
	)

	const dealsContainer = (product) => (
		<>
			{product.deal && product.deal.amount ? (
				<div className="deals">
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

	const externalLinkContainer = (product) => (
		<>
			{product.externalLink ? (
				<div className="external-link">
					<p>O compralo en Mercado Libre:</p>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`${product.externalLink}`}
						className="btn btn-primary"
					>
						<img src={'../../static/images/mercado-libre.png'}></img>
					</a>
					{((product.deal && product.deal.amount) || product.discount) && (
						<span className="deal-msg">Ofertas y Descuentos no disponibles en Mercado Libre </span>
					)}
				</div>
			) : (
				<></>
			)}
		</>
	)

	return (
		<div className="product-info">
			{generalInfo(product)}
			<div className="product-status">
				{currencySwitchContainer()}

				{priceContainer(product)}

				{stockContainer(product)}

				{qtyInputContainer(product)}

				{dealsContainer(product)}

				{product.countInStock > 0 ? (
					<>
						<button
							onClick={addToCartHandler}
							className="btn btn-primary mt-1"
							disabled={product.countInStock === 0}
						>
							Añadir a Carro
						</button>
						{externalLinkContainer(product)}
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default InfoAndOptions
