import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { shopDetails as getShopDetails } from '../../actions/shopActions'

const Meta = ({ title, description, keywords }) => {
	const dispatch = useDispatch()

	const shopDetails = useSelector((state) => state.shopDetails)

	const { shop } = shopDetails

	useEffect(() => {
		if (!shop || !shop.email) {
			dispatch(getShopDetails())
		}
	}, [shop, dispatch])

	return (
		<Helmet>
			<title>{title ? title : shop && shop.name}</title>
			<meta name="description" content={description ? description : shop && shop.message} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	keywords: 'electrónica, tecnología, comprar tecnología, tecnología economica',
}

export default Meta
