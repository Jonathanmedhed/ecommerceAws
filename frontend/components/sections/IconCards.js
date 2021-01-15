import React from 'react'

const IconCards = ({ infoRef }) => {
	return (
		<section ref={infoRef} className="sm-sections">
			<h2>Todo lo que necesitas para vender en línea</h2>
			<div className="content">
				<article className="sm-section">
					<i className="far fa-credit-card"></i>
					<h3>Diferentes Métodos de Pago</h3>
					<p>
						Ofrece diferentes métodos de pago como <strong>Pago Móvil</strong>,{' '}
						<strong>Efectivo en $ o Bs</strong> o a través de <strong>Mercado Libre</strong>.
					</p>
				</article>
				<article className="sm-section">
					<i className="fas fa-edit"></i>
					<h3>Contenido Customizable</h3>
					<p>
						Elige como mostrar el contenido de tu página web, agrega nuevos productos y customiza la
						información mostrada a los clientes.
					</p>
				</article>
				<article className="sm-section">
					<i className="fas fa-chart-line"></i>
					<h3>Monitoreo de Ventas</h3>
					<p>
						Sigue de cerca la actividad de tus productos, el número de ventas y el ingreso percibido por tu
						tienda.
					</p>
				</article>
				<article className="sm-section">
					<i className="fas fa-map-marker-alt"></i>
					<h3>Llegar a Más Clientes</h3>
					<p>
						Llega a clientes que nunca antes podrías haber alcanzado, ya sea debido a distancia, o
						simplemente desconocimiento de la localización de tu tienda.
					</p>
				</article>
			</div>
		</section>
	)
}

export default IconCards
