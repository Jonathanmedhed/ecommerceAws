import React from 'react'

const GeneralInfoForm = ({ name, brand, category, description, onChange }) => {
	return (
		<>
			<div className="form-group">
				<label>Nombre</label>
				<input
					type="name"
					placeholder="Ingresar nombre"
					value={name}
					name="name"
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Marca</label>
				<input
					type="text"
					placeholder="Ingresar marca"
					value={brand}
					name="brand"
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Categoría</label>
				<input
					type="text"
					placeholder="Ingresar categoría"
					value={category}
					name="category"
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Descripción</label>
				<textarea
					placeholder="Ingresar descripción"
					value={description}
					name="description"
					onChange={(e) => onChange(e)}
					rows={6}
				></textarea>
			</div>
		</>
	)
}

export default GeneralInfoForm
