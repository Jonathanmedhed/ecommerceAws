import React, { useEffect } from 'react'
import { Carousel } from 'primereact/carousel'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import Message from '../alerts/Message'
import { listTopProducts } from '../../actions/productActions'

const ProductCarousel = () => {
	const dispatch = useDispatch()

	const productTopRated = useSelector((state) => state.productTopRated)
	const { loading, error, products } = productTopRated

	useEffect(() => {
		dispatch(listTopProducts())
	}, [dispatch])

	const itemTemplate = (product) => <img className="carousel-product" src={product.image} alt={product.name}></img>

	const desktopCarousel = () => (
		<Carousel
			className="hide-sm"
			value={products}
			itemTemplate={itemTemplate}
			numVisible={3}
			numScroll={2}
			autoplayInterval={3000}
			circular
		></Carousel>
	)

	const mobileCarousel = () => (
		<Carousel
			className="show-portrait"
			value={products}
			itemTemplate={itemTemplate}
			numVisible={1}
			numScroll={1}
			autoplayInterval={3000}
			circular
		></Carousel>
	)

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			{desktopCarousel()}
			{mobileCarousel()}
		</>
	)
}

export default ProductCarousel
