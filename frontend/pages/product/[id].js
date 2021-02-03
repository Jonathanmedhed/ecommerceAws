import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// components
import { Carousel } from 'primereact/carousel'
import Error from '../../components/error/Error'
import Loader from '../../components/loader/Loader'
import Meta from '../../components/meta/Meta'
import InfoAndOptions from '../../components/product/InfoAndOptions'
import ExtraInfoSection from '../../components/product/ExtraInfoSection'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { listProductDetails } from '../../actions/productActions'
// constants
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET } from '../../constants/productConstants'
import { APP_NAME, DOMAIN } from '../../config'

const ProductScreen = ({ query }) => {
	const router = useRouter()

	const [qty, setQty] = useState(1)
	const [changeCurrency, setChangeCurrency] = useState(false)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop } = shopDetails

	useEffect(() => {
		if (!product || !product._id || (product && product._id !== query.id)) {
			dispatch(listProductDetails(query.id))
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
	}, [dispatch, query, product])

	const addToCartHandler = () => {
		router.push(`/cart/${query.id}?qty=${qty}`)
		dispatch({ type: PRODUCT_DETAILS_RESET })
	}

	const imgTemplate = (pic) => <img src={pic} alt={pic}></img>

	const productImages = (product) => (
		<div className="product-image" md={6}>
			{product.images && product.images.length === 1 ? (
				<img src={product.images[0]} alt={product.name}></img>
			) : (
				<Carousel value={product.images} itemTemplate={imgTemplate} numVisible={1} numScroll={1}></Carousel>
			)}
		</div>
	)

	const topSection = (product) => (
		<div className="top">
			{productImages(product)}
			<InfoAndOptions
				product={product}
				changeCurrency={changeCurrency}
				setChangeCurrency={setChangeCurrency}
				shop={shop}
				qty={qty}
				setQty={setQty}
				addToCartHandler={addToCartHandler}
			/>
		</div>
	)

	const specsSection = (product) => (
		<>
			{product.specs && product.specs.length > 0 && (
				<>
					<h2 className="review-title">Especificaciones</h2>
					<div className="specs">
						{product.specs.map((spec) => (
							<h3>
								<i className="fas fa-circle"></i>
								{spec}
							</h3>
						))}
					</div>
				</>
			)}
		</>
	)

	const htmlHeader = (product) => (
		<HtmlHeader
			title={product.name}
			shortcutIcon={'/static/logo-round.jpg'}
			description={product.description}
			link={`${DOMAIN}/product/${product._id}`}
			ogTitle={`${APP_NAME} | Páginas Web`}
			ogDescription={product.description}
			ogType={'website'}
			ogUrl={`${DOMAIN}/product/${product._id}`}
			ogSiteName={`${APP_NAME}`}
			ogImg={``}
			ogImgSecureUrl={product && product.images && product.images[0]}
			ogImgType={'image/png'}
			//fbId={}
		/>
	)

	return (
		<>
			{loading ? (
				<Loader absolute />
			) : error ? (
				<Error />
			) : (
				<>
					{htmlHeader(product)}
					<Meta title={product.name} />
					<div className="product-layout">
						{topSection(product)}
						{specsSection(product)}
						<ExtraInfoSection product={product} />
					</div>
				</>
			)}
		</>
	)
}

ProductScreen.getInitialProps = ({ query }) => {
	return { query }
}

export default ProductScreen
