import React from 'react'

const PriceSection = ({ priceRef }) => {
	return (
		<section ref={priceRef} className="cost-section">
			<div className="section-content">
				<div className="info">
					<article className="content">
						<i className="far fa-credit-card"></i>
						<h1>Precios Según tus Necesidades</h1>
						<p>Elige la página web que mejor se aplique a tu negocio</p>
					</article>
				</div>
				<article className="basic-info">
					<p className="pre-title">Básica</p>
					<h2>
						$200 <span>(pago único)</span>
					</h2>
					<p className="content">Una página web con las funciones principales, sin modificaciones extras</p>
					<ul className="list">
						<li className="item">
							<i className="fas fa-check-circle"></i> Todas las funciones mostradas
						</li>
						<li className="item">
							<i className="fas fa-check-circle"></i> Sin modificaciones extras
						</li>
						<li className="item">
							<i className="fas fa-check-circle"></i> Vistas para PC y Móvil
						</li>
					</ul>
					<button
						onClick={() => contactRef.current.scrollIntoView({ behavior: 'smooth' })}
						className="btn btn-primary"
					>
						Solicitar
					</button>
				</article>
				<article className="premium-info">
					<div className="top">
						<p className="pre-title">Customizada</p>
						<h2>
							$200+ <span>(pago único)</span>
						</h2>
					</div>
					<div className="bottom">
						<p className="content">Una página web diseñada especialmente para tu tienda</p>
						<ul className="list">
							<li className="item">
								<i className="fas fa-check-circle"></i> Colores y estilo ligados a tu marca
							</li>
							<li className="item">
								<i className="fas fa-check-circle"></i> Funciones y secciones extras
							</li>
							<li className="item">
								<i className="fas fa-check-circle"></i> Vistas para PC y Móvil
							</li>
							<li className="item">
								<i className="fas fa-check-circle"></i> y más...
							</li>
							<li className="item">
								<i className="fas fa-check-circle"></i> Precio depende de los cambios requeridos
							</li>
						</ul>
						<button
							onClick={() => contactRef.current.scrollIntoView({ behavior: 'smooth' })}
							className="btn btn-primary"
						>
							Solicitar
						</button>
					</div>
				</article>
			</div>
		</section>
	)
}

export default PriceSection
