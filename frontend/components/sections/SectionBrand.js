import React from 'react'
import Link from 'next/link'

const SectionBrand = () => {
	const brands = [
		{ name: 'Samsung', img: '../../static/images/samsung.png' },
		{ name: 'Apple', img: '../../static/images/apple.png' },
		{ name: 'Sony', img: '../../static/images/sony.png' },
	]
	return (
		<section className="three-products-w-border">
			<article className="message">
				<h2 className="title">Las Mejores Marcas en Celulares y Accesorios</h2>
				<div className="products pt-2">
					{brands &&
						brands.map((brand) => (
							<div key={brand.name} className="product">
								<Link href={`/products-brand/${brand.name}`}>
									<article className="brand">
										<div className="img-container">
											<img alt={brands.name} src={brand.img}></img>
										</div>
										<h3>{brand.name}</h3>
									</article>
								</Link>
							</div>
						))}
				</div>
			</article>
		</section>
	)
}

export default SectionBrand
