import React from 'react'
import Product from '../product/Product'
import Link from 'next/link'

const SectionCheapProducts = ({ section, products, shop }) => {
	return (
		<>
			<section className="three-products">
				<article className="message">
					<h2 className="title">{section.title}</h2>
					<div className="products">
						{products &&
							products
								.sort((a, b) => (a.price < b.price ? 1 : -1))
								.slice(Math.max(products.length - 3, 0))
								.map((product) => (
									<div className="product">
										<Product
											key={product._id}
											product={product}
											currency={false}
											dollarValue={shop.dollarValue}
										/>
									</div>
								))}
					</div>
					<Link href={'product-selection'}>
						<button className="btn btn-primary my-1">Ver Mas</button>
					</Link>
				</article>
			</section>
		</>
	)
}

export default SectionCheapProducts
