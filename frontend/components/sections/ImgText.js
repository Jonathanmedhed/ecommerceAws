import React from 'react'

const ImgText = () => {
	return (
		<section className="text-img-section">
			<img src={'../static/images/user-office.jpg'} alt={'user-img'}></img>
			<article className="right">
				<div className="right-content">
					<p className="pre-title">Por que elegirnos?</p>
					<h2>Crearemos la Página Web Ideal para Tu Negocio</h2>
					<p className="text">
						En <strong>heddrict IT soluciones</strong> creamos páginas web de excelente calidad,{' '}
						<strong>fáciles de usar y entender</strong>, <strong>completamente customizables</strong>,
						otorgándote <strong>herramientas esenciales</strong> para el manejo de tu negocio
					</p>
				</div>
			</article>
		</section>
	)
}

export default ImgText
