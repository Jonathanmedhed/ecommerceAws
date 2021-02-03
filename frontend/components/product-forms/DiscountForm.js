import React from 'react'

const DiscountForm = ({ discount, dealAmount, dealDiscount, dealQtyFree, onChange }) => {
	return (
		<>
			<div className="form-group">
				<label>Descuento %</label>
				<input
					type="number"
					placeholder="10, 20, 25..."
					value={discount}
					name="discount"
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label className="mt-half color-dark">Oferta</label>
				<label>Cantidad del Producto</label>
				<p>
					Ejemplo: Lleve <strong>(3)</strong> y pague 2
				</p>
				<input
					type="number"
					placeholder="10"
					value={dealAmount}
					name="dealAmount"
					onChange={(e) => onChange(e)}
				></input>
				<label>Descuento a aplicar x articulo</label>
				<p>
					Ejemplo: Lleve 3 y reciba <strong>(10)</strong>% de descuento por articulo
				</p>
				<input
					type="number"
					placeholder="10"
					value={dealDiscount}
					name="dealDiscount"
					onChange={(e) => onChange(e)}
				></input>
				<label>Cantidad de articulos gratis</label>
				<p>
					Ejemplo: Compre 3 y lleve <strong>(1)</strong> Gratis
				</p>
				<input
					type="number"
					placeholder="10"
					value={dealQtyFree}
					name="dealQtyFree"
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)
}

export default DiscountForm
