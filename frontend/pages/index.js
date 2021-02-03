import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
// components
import HtmlHeader from '../components/html-header/HtmlHeader'
import Cookie from '../components/cookies/Cookie'
import Loader from '../components/loader/Loader'
import Message from '../components/alerts/Message'
import SectionImgBG from '../components/sections/SectionImgBG'
import SectionTextOnly from '../components/sections/SectionTextOnly'
import SectionImgAndText from '../components/sections/SectionImgAndText'
import SeoContent from '../components/seo-content/SeoContent'
// actions
import { shopDetails as getShopDetails } from '../actions/shopActions'
import { listProducts } from '../actions/productActions'
// constants
import { APP_NAME, DOMAIN } from '../config'
import Error from '../components/error/Error'

const Index = () => {
	const [loaded, setLoaded] = useState(false)

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading, error } = shopDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const productList = useSelector((state) => state.productList)
	const { loading: loadingProducts, allProducts, error: errorProducts } = productList

	const dispatch = useDispatch()

	useEffect(() => {
		if (!shop || !shop.email) {
			dispatch(getShopDetails())
		}
		if (!allProducts || allProducts.length == 0) {
			dispatch(listProducts('', '1'))
		}
	}, [shop, allProducts, dispatch])

	const headTemplate = () => (
		<HtmlHeader
			title={APP_NAME}
			shortcutIcon={'/static/logo-round.jpg'}
			description={'Ultimos productos tecnologicos en Venezuela'}
			link={`${DOMAIN}`}
			ogTitle={`${APP_NAME} | Páginas Web`}
			ogDescription={'Ultimos productos tecnologicos en Venezuela'}
			ogType={'website'}
			ogUrl={`${DOMAIN}`}
			ogSiteName={`${APP_NAME}`}
			ogImg={``}
			ogImgSecureUrl={`../static/images/phone.png`}
			ogImgType={'image/png'}
			//fbId={}
		/>
	)

	const jumboComponent = (shop) => (
		<div className="home" style={loaded ? {} : { display: 'none' }}>
			<div className="content">
				<img
					onLoad={() => setLoaded(true)}
					className="home-image"
					src={shop && shop.image ? shop.image : require(`../static/images/home.jpg`)}
					alt="home"
				></img>
				<div className="message">
					<h1 className="title">{shop && shop.title ? shop.title : shop && shop.name && shop.name}</h1>
					{shop && shop.message && <p className="text">{shop.message}</p>}
					<div className="options">
						<Link href="/product-selection">
							<span className="btn btn-light">Productos</span>
						</Link>
						{!userInfo && (
							<Link href="/login">
								<span className="btn btn-primary">Ingresar</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)

	const sections = (shop) => (
		<>
			{shop.sections &&
				shop.sections.map((section) => (
					<div className="home-section" style={loaded ? {} : { display: 'none' }}>
						<SectionImgBG section={section} />
						<SectionTextOnly section={section} />
						<SectionImgAndText section={section} item={shop} />
					</div>
				))}
		</>
	)

	return (
		<>
			{headTemplate()}
			<>
				<Cookie />
				{loading && loadingProducts ? (
					<Loader absolute={true} />
				) : error || errorProducts ? (
					<Error />
				) : (
					shop &&
					allProducts && (
						<>
							{jumboComponent(shop)}
							<SeoContent products={allProducts} shop={shop} />
							{sections(shop)}
						</>
					)
				)}
			</>
		</>
	)
}

export default Index
