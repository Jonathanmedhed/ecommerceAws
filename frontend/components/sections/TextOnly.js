import React from 'react'

const TextOnly = () => {
	return (
		<section className="text-section mb-1">
			<p className="pre-title">Página Web</p>
			<h2>'Como se vería mi página?'</h2>
			<p className="text">Ingresa en el siguiente enlace para ver un ejemplo de como podría ser tu página</p>
			<p className="text">(Contáctanos para darte acceso como administrador)</p>
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="btn btn-primary mt-1"
				href="https://ecommercespanish.herokuapp.com/"
			>
				Ingresar
			</a>
			<div className="sm-line"></div>
		</section>
	)
}

export default TextOnly
