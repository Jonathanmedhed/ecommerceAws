import React from 'react'

const TextGif = () => {
	return (
		<section className="features-gif">
			<article className="left-content">
				<div className="left-inside">
					<div className="feat">
						<i className="far fa-hand-point-right hide-sm"></i>
						<i className="far fa-hand-point-down show-sm"></i>
						<h2>La Forma Más Sencilla de Comprar</h2>
						<p>Permite comprar a tus clientes con tan solo unos clicks.</p>
					</div>
				</div>
			</article>
			<div className="right-content">
				<div className="inside">
					<img src={'../static/images/mobile-hand.png'} alt="phone-header"></img>
					<img src={'../static/images/gif.gif'} alt="comprar-en-linea"></img>
				</div>
			</div>
		</section>
	)
}

export default TextGif
