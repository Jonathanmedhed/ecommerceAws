import React from 'react'

const ExternalLinkForm = ({ onChange, externalLink }) => {
	return (
		<div className="form-group">
			<label>Enlace Mercado Libre</label>
			<input
				type="text"
				placeholder="https://articulo.mercadolibre.com.ve/..."
				value={externalLink}
				name="externalLink"
				onChange={(e) => onChange(e)}
			></input>
		</div>
	)
}

export default ExternalLinkForm
