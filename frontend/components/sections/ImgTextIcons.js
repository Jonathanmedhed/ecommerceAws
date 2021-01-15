import React from 'react'

const ImgTextIcons = () => {
	return (
		<section className="features-img-rev">
			<div className="left-content">
				<div className="img-container">
					<img src={'../static/images/content.png'} alt="tienda-movil"></img>
				</div>
			</div>
			<article className="right-content">
				<div className="right-inside">
					<ul className="feat">
						<i className="far fa-edit"></i>
						<h2>Actualiza el Contenido e Información</h2>
						<li>
							<i className="fas fa-search-dollar"></i> Actualiza el valor del dolar.
						</li>
						<li>
							{' '}
							<i className="fas fa-truck"></i> Modifica el costo y tiempo de envío{' '}
						</li>
						<li>
							<i className="far fa-file-alt"></i> Cambia el contenido de la pagina principal.
						</li>
						<li>
							<i className="fas fa-ellipsis-h"></i> Y mucho más...
						</li>
					</ul>
				</div>
			</article>
		</section>
	)
}

export default ImgTextIcons
