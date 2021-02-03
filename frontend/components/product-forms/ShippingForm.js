import React from 'react'

const ShippingForm = ({ setFormData, formData, onChange, shippingCost, unitShippingCost }) => {
	return (
		<>
			<div className="form-group">
				<label>Costo en $</label>
				<input
					type="number"
					placeholder="Ingresar costo"
					value={shippingCost}
					name="shippingCost"
					onChange={(e) => onChange(e)}
				></input>
			</div>
			<div className="form-group">
				<div className="switch-currency-sm mt-half">
					<div className={unitShippingCost ? 'left' : 'left-highlighted'}>x Grupo</div>
					<label className="switch">
						<input
							checked={unitShippingCost}
							onChange={() => setFormData({ ...formData, unitShippingCost: !unitShippingCost })}
							type="checkbox"
						></input>
						<span className="slider round"></span>
					</label>
					<div className={unitShippingCost ? 'right-highlighted' : 'right'}>x Unidad</div>
				</div>
			</div>
		</>
	)
}

export default ShippingForm
