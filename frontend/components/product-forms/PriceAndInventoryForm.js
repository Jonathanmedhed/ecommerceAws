import React from 'react'

const PriceAndInventoryForm = ({ price, countInStock, onChange }) => {
	return (
		<>
			<div className="form-group">
				<label>Precio $</label>
				<input
					type="number"
					placeholder="Ingresar precio"
					value={price}
					name="price"
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Cantidad en Inventario</label>
				<input
					type="number"
					placeholder="Ingresar cantidad"
					value={countInStock}
					name="countInStock"
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)
}

export default PriceAndInventoryForm
