import React from 'react'
import SectionTextOnly from '../sections/SectionTextOnly'
import SectionCheapProducts from '../sections/SectionCheapProducts'
import SectionBrand from '../sections/SectionBrand'

const SeoContent = ({ products, shop }) => {
	const fanatics = {
		title: 'Para Fanáticos de la Tecnología',
		text: 'Vendemos tecnología de punta en celulares, laptops, tablets, y todo tipo de accesorios a toda Venezuela',
		type: 'Texto sin Imagen',
	}

	const bestPrice = { title: 'Catálogo de tecnologías al mejor precio' }
	return (
		<section className="home-section">
			{/**<SectionTextOnly section={fanatics} />*/}
			<SectionCheapProducts section={bestPrice} products={products} shop={shop} />
			<SectionBrand />
		</section>
	)
}

export default SeoContent
