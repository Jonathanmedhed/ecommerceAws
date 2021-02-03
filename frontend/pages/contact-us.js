/*global google*/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// components
import { GMap } from 'primereact/gmap'
import Loader from '../components/loader/Loader'
import Error from '../components/error/Error'
import HtmlHeader from '../components/html-header/HtmlHeader'
// actions
import { shopDetails as getShopDetails } from '../actions/shopActions'
import { addMapScript } from '../actions/mapActions'
// constants
import { APP_NAME } from '../config'

const ContactUsScreen = () => {
	const dispatch = useDispatch()

	const [loaded, setLoaded] = useState(false)

	const [mapReady, setMapReady] = useState(false)

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading, error } = shopDetails

	useEffect(() => {
		if (!mapReady) {
			addMapScript(setMapReady)
		}

		dispatch(getShopDetails())
	}, [dispatch, mapReady])

	const mapContainer = () => (
		<div className="map-container">
			{!mapReady ? (
				<Loader />
			) : (
				<GMap
					options={{
						center: {
							lat: shop && shop.lat && shop.lat,
							lng: shop && shop.lng && shop.lng,
						},
						zoom: 16,
					}}
					overlays={[
						new google.maps.Marker({
							position: {
								lat: shop && shop.lat && shop.lat,
								lng: shop && shop.lng && shop.lng,
							},
							title: 'Shop Name',
						}),
					]}
					className="map"
					style={{ width: '100%' }}
				/>
			)}
		</div>
	)

	const phoneComponent = () => (
		<>
			{shop && shop.phone && (
				<>
					<div className="show-sm">
						<a href={`tel:${shop.phone}`} className="item">
							<i className="fas fa-phone"></i>
							<div className="data">{shop.phone}</div>
						</a>
					</div>
					<div className="hide-sm">
						<div className="item">
							<i className="fas fa-phone"></i>
							<div className="data">{shop.phone}</div>
						</div>
					</div>
				</>
			)}
		</>
	)

	const emailComponent = () => (
		<>
			{shop && shop.email && (
				<>
					<div className="show-sm">
						<a href={`mailto:${shop.email}`} className="item">
							<i className="far fa-envelope"></i>
							<div className="data">{shop.email}</div>
						</a>
					</div>
					<div className="hide-sm">
						<div className="item">
							<i className="far fa-envelope"></i>
							<div className="data">{shop.email}</div>
						</div>
					</div>
				</>
			)}
		</>
	)

	const addressComponent = () => (
		<>
			{shop && shop.address && (
				<div className="item">
					<i className="fas fa-map-marker-alt"></i>
					<div className="data">
						{shop.address}, {shop.city}, {shop.postalCode},{shop.country}
					</div>
				</div>
			)}
		</>
	)

	const openingTimesComponent = () => (
		<>
			{shop && shop.openingTimes && shop.openingTimes.length > 0 && (
				<div className="item">
					<i className="far fa-clock"></i>
					<div className="data">
						{shop.openingTimes.map((time) => (
							<div className="opening-time">
								<div className="days">{time.rangeDays}</div>
								<div className="times">{time.rangeTimes}</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)

	const contactInfo = () => (
		<div className={shop && shop.lat && shop.lng && shop.lat !== 0 && shop.lng !== 0 ? 'info ml-2' : 'info'}>
			{phoneComponent()}
			{emailComponent()}
			{addressComponent()}
			{openingTimesComponent()}
		</div>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Contacto`} />

	return (
		<div className="contact-us">
			{htmlHeader()}
			{}
			{loading ? (
				<Loader absolute={true} />
			) : error ? (
				<Error />
			) : (
				<div className="contact-container" style={loaded ? {} : { display: 'none' }}>
					{/** Background img */}
					<img
						onLoad={() => setLoaded(true)}
						className="home-image"
						src={shop && shop.image ? shop.image : require(`../static/images/home.jpg`)}
						alt="home"
					></img>
					<div className="content">
						<p className="message">Encuéntranos </p>
						<div className="line-title"></div>
						<div className="map-contact">
							{/** Map */}
							{shop && shop.lat && shop.lng && shop.lat !== 0 && shop.lng !== 0 && <>{mapContainer()}</>}
							{/** Contact Info */}
							{contactInfo()}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ContactUsScreen
