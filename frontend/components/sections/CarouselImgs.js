import React from 'react'
import { Carousel } from 'primereact/carousel'

const CarouselImgs = () => {
	const images = [
		{
			img: '../static/images/cart.jpg',
			title: 'Carro de Compra',
			text:
				'Ademas de mostrar la cantidad de productos y el total, tambien muestra el descuento aplicado, articulos gratis y oportunidad para descuentos.',
		},
		{
			img: '../static/images/contact-us.jpg',
			title: 'Contacto',
			text:
				'Muestra diferentes métodos de contacto para tus clientes, Horarios y la localización en Google Maps (Todo es Modificable).',
		},
		{
			img: '../static/images/graph-sales.jpg',
			title: 'Gráfico de Ventas',
			text: 'Monitorea tus ventas e ingresos diarios, semanales, mensuales y anuales.',
		},
		{
			img: '../static/images/graph-sales-product.jpg',
			title: 'Gráfico de Ventas por Producto',
			text: 'Monitorea las ventas e ingresos de cada producto.',
		},
		{
			img: '../static/images/login.jpg',
			title: 'Cuentas de Usuario',
			text: 'Permite a usuarios crear cuentas para monitorear sus órdenes.',
		},
		{
			img: '../static/images/order-movil.jpg',
			title: 'Pago Móvil',
			text: 'Recibe pagos via pago móvil.',
		},
		{
			img: '../static/images/order.jpg',
			title: 'Información de Orden',
			text: 'Ve el estado, aprueba, anula órdenes y mucho más.',
		},
		{
			img: '../static/images/orders.jpg',
			title: 'Listado de Ordenes',
			text: 'Ve el listado de tus órdenes por aprobar, entregar o completadas',
		},
		{
			img: '../static/images/product.jpg',
			title: 'Información de Producto',
			text: 'Muestra la información sobre el producto, cantidad en inventario y cualquier oferta disponible',
		},
		{
			img: '../static/images/products.jpg',
			title: 'Listado de Productos',
			text: 'Muestra un listado de los productos, con descuentos aplicados, ademas de otras ofertas disponibles.',
		},
	]

	const itemTemplate = (item) => (
		<article className="carousel-product-info">
			<img className="carousel-mobile-img" src={item.img} alt={'carousel-img'}></img>
			<div className="content">
				<section className="inside-content">
					<h2>{item.title}</h2>
					<p>{item.text}</p>
				</section>
			</div>
		</article>
	)

	return (
		<section className="carousel-section">
			<img className="frame" src={'../static/images/frame-no-padding.png'} alt={'frame'}></img>
			<Carousel
				value={images}
				itemTemplate={itemTemplate}
				numVisible={1}
				numScroll={1}
				circular={true}
			></Carousel>
		</section>
	)
}

export default CarouselImgs
