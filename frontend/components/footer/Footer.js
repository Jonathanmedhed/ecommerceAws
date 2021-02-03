import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shopDetails as getShopDetails } from '../../actions/shopActions'
import { APP_NAME } from '../../config'

const Footer = () => {
	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop } = shopDetails

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getShopDetails())
	}, [dispatch])

	const socials = () => {
		shop && (shop.facebook || shop.twitter || shop.instagram) && (
			<div className="social">
				{shop.twitter && (
					<a target="_blank" rel="noopener noreferrer" href={shop.twitter} className="sub-item">
						<i className="fab fa-twitter"></i>
					</a>
				)}
				{shop.facebook && (
					<a target="_blank" rel="noopener noreferrer" href={shop.facebook} className="sub-item">
						<i className="fab fa-facebook-f"></i>
					</a>
				)}
				{shop.instagram && (
					<a target="_blank" rel="noopener noreferrer" href={shop.instagram} className="sub-item">
						<i className="fab fa-instagram"></i>
					</a>
				)}
			</div>
		)
	}

	const logo = () => (
		<div className="logo-section">
			<div className="logo">
				<img src={'../static/images/logo-example.png'} alt="shop-logo"></img>
			</div>
			<span>{APP_NAME}</span>
		</div>
	)

	const bottomInfo = () => (
		<div className="bottom">
			Pagina creada por{' '}
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.linkedin.com/in/jonathan-medina-heddrich-49164196/"
			>
				Jonathan Medina <i className="fas fa-external-link-alt"></i>
			</a>
		</div>
	)

	return (
		<footer>
			{socials()}
			{logo()}
			{bottomInfo()}
		</footer>
	)
}

export default Footer
