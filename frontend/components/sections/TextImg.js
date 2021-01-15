import React from 'react'

const TextImg = () => {
	return (
		<section className="features-img">
			<div className="left-content">
				<div className="left-inside">
					<article className="feat">
						<h2>
							<i className="fas fa-caret-right"></i> Ofertas
						</h2>
						<p>Ofrece descuentos, combos como 'Lleva 3 y paga 2' y más.</p>
					</article>
					<article className="feat">
						<h2>
							<i className="fas fa-caret-right"></i> Bs y Divisas
						</h2>
						<p>Muestra el precio de tus productos en bolívares y en dólares con un solo click.</p>
					</article>
					<article className="feat">
						<h2>
							<i className="fas fa-caret-right"></i> Categorias y Marcas
						</h2>
						<p>Muestra tus productos por categoría o por marca.</p>
					</article>
				</div>
			</div>
			<div className="right-content">
				<img src={'../static/images/mobile-hand-bg.jpg'} alt="vender-en-linea"></img>
			</div>
		</section>
	)
}

export default TextImg
