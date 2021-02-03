import React from 'react'

const SpecsForm = ({ specs, setFormData, formData, spec, setSpec }) => {
	return (
		<div className="form-group">
			{specs &&
				specs.map((spec) => (
					<div className="opening-times">
						<div className="opening-time">
							<span>{spec}</span>
						</div>
						<div
							onClick={() =>
								setFormData({
									...formData,
									specs: specs.filter((x) => x !== spec),
								})
							}
							className="btn-icon btn-danger"
						>
							<i className="far fa-trash-alt"></i>
						</div>
					</div>
				))}
			<label>Especificaciones</label>
			<textarea
				placeholder="Ingresar especificación"
				value={spec}
				name="spec"
				onChange={(e) => setSpec(e.target.value)}
				rows={6}
			></textarea>
			<div
				onClick={() =>
					setFormData({
						...formData,
						specs: [...specs, spec],
					})
				}
				className="btn-icon btn-success mt-half"
			>
				<i className="fas fa-plus"></i>
			</div>
		</div>
	)
}

export default SpecsForm
