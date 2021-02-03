/*global google*/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// Components
import { Accordion, AccordionTab } from 'primereact/accordion'
import { GMap } from 'primereact/gmap'
import Loader from '../../components/loader/Loader'
import Message from '../../components/alerts/Message'
import Uploader from '../../components/upload/Uploader'
import ExtraInfoForm from '../../components/product-forms/ExtraInfoForm'
import HtmlHeader from '../../components/html-header/HtmlHeader'
import Error from '../../components/error/Error'
// Functions
import { shopDetails as getShopDetails, createShop, updateShop } from '../../actions/shopActions'
import { addMapScript } from '../../actions/mapActions'
import { addSection, moveSectionDown, moveSectionUp, removeSection } from '../../actions/sectionActions'
// Constants
import { SHOP_UPDATE_RESET } from '../../constants/shopConstants'
import { APP_NAME } from '../../config'

const ShopInfoScreen = () => {
	const router = useRouter()

	const [showMap, setShowMap] = useState(false)

	// Accordion Indexes
	const [activeIndex, setActiveIndex] = useState(null)

	const [rangeDays, setRangeDays] = useState('')
	const [rangeTimes, setRangeTimes] = useState('')

	// To check if maps script is set
	const [mapReady, setMapReady] = useState(false)

	// Gmap default location
	const [options, setOptions] = useState(null)

	// Gmap overlays
	const [overlays, setOverlays] = useState(null)

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading, error } = shopDetails

	const shopCreate = useSelector((state) => state.shopCreate)
	const { success: successCreate, loading: loadingCreate, error: errorCreate } = shopCreate

	const shopUpdate = useSelector((state) => state.shopUpdate)
	const { success: successUpdate, loading: loadingUpdate, error: errorUpdate } = shopUpdate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	// Form Values
	const [formData, setFormData] = useState({
		address: '',
		city: '',
		postalCode: '',
		country: '',
		phone: '',
		message: '',
		mobile: '',
		name: '',
		email: '',
		facebook: '',
		instagram: '',
		title: '',
		twitter: '',
		lat: 0,
		lng: 0,
		image: '',
		dollarValue: 0,
		waitTime: 0,
		waitTimeDelivery: 0,
		taxPercentage: 0,
		includeTax: false,
		logo: '',
		openingTimes: [],
		sections: [],
		shipmentCost: 0,
		shipmentLimit: 0,
		// Mobile payment
		mobileBank: '',
		mobilePhone: '',
		mobileID: '',
		// Section creation
		sectionTitle: '',
		sectionText: '',
		sectionImg: '',
		sectionType: '',
		sectionPosition: 1,
	})
	// Form Values Variables
	const {
		address,
		city,
		postalCode,
		country,
		phone,
		message,
		mobile,
		name,
		email,
		facebook,
		instagram,
		title,
		twitter,
		lat,
		lng,
		image,
		dollarValue,
		waitTime,
		waitTimeDelivery,
		taxPercentage,
		includeTax,
		logo,
		openingTimes,
		sections,
		shipmentCost,
		shipmentLimit,
		// Mobile payment
		mobileBank,
		mobilePhone,
		mobileID,
		// Section creation
		sectionTitle,
		sectionText,
		sectionImg,
		sectionType,
		sectionPosition,
	} = formData

	const dispatch = useDispatch()

	// Set script if not set, set map overlays, and show map
	const setUpMap = async () => {
		await addMapScript(setMapReady)
		setOverlays([
			new google.maps.Marker({
				position: {
					lat: shop.lat,
					lng: shop.lng,
				},
			}),
		])
		setOptions({
			center: { lat: shop.lat, lng: shop.lng },
			zoom: 14,
		})
		setShowMap(true)
	}

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			router.push('/login')
		}
		const scriptExists = document.getElementById('gmap')
		if (!mapReady || !scriptExists) {
			addMapScript(setMapReady)
		} else {
			if (successUpdate) {
				dispatch({ type: SHOP_UPDATE_RESET })
				dispatch(getShopDetails())
			} else if (successCreate && !shop) {
				dispatch(getShopDetails())
			} else if (shop && shop.email) {
				setFormData({
					...formData,
					address: shop.address,
					city: shop.city,
					postalCode: shop.postalCode,
					country: shop.country,
					phone: shop.phone,
					message: shop.message,
					mobile: shop.mobile,
					name: shop.name,
					email: shop.email,
					facebook: shop.facebook,
					instagram: shop.instagram,
					title: shop.title,
					twitter: shop.twitter,
					lat: shop.lat,
					lng: shop.lng,
					image: shop.image,
					dollarValue: shop.dollarValue,
					waitTime: shop.waitTime,
					waitTimeDelivery: shop.waitTimeDelivery,
					taxPercentage: shop.taxPercentage,
					includeTax: shop.includeTax,
					logo: shop.logo,
					openingTimes: shop.openingTimes,
					sections: shop.sections,
					shipmentCost: shop.shipmentCost,
					shipmentLimit: shop.shipmentLimit,
					// Mobile payment
					mobileBank: shop.mobileBank,
					mobilePhone: shop.mobilePhone,
					mobileID: shop.mobileID,
				})
			} else if (shop && !shop.email) {
				dispatch(getShopDetails())
			}
		}
	}, [successCreate, successUpdate, shop, mapReady, userInfo, dispatch])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateShop({
				_id: shop._id,
				address,
				city,
				postalCode,
				country,
				facebook,
				image,
				instagram,
				twitter,
				phone,
				message,
				mobile,
				name,
				email,
				lat,
				lng,
				title,
				dollarValue,
				waitTime,
				waitTimeDelivery,
				taxPercentage,
				includeTax,
				logo,
				openingTimes,
				sections,
				shipmentCost,
				shipmentLimit,
				// Mobile payment
				mobileBank,
				mobilePhone,
				mobileID,
			})
		)
	}

	// set selected point on map click
	const onMapClick = (event) => {
		let jsonEvent = JSON.stringify(event)
		if (jsonEvent[0]) {
			setOverlays([
				new google.maps.Marker({
					position: {
						lat: event.latLng.lat(jsonEvent[0].x),
						lng: event.latLng.lng(jsonEvent[0].y),
					},
				}),
			])
			setOptions({
				center: { lat: event.latLng.lat(jsonEvent[0].x), lng: event.latLng.lng(jsonEvent[0].y) },
				zoom: 14,
			})
			setFormData({ ...formData, lng: event.latLng.lng(jsonEvent[0].y), lat: event.latLng.lat(jsonEvent[0].x) })
		}
	}

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const uploadFileHandler = (img) => {
		setFormData({ ...formData, image: img })
	}

	const uploadSectionFileHandler = (img) => {
		setFormData({ ...formData, sectionImg: img })
	}

	const uploadLogoHandler = (img) => {
		setFormData({ ...formData, logo: img })
	}

	const saveChangesButton = () => (
		<button type="submit" className="btn btn-primary mt-1">
			Guardar Cambios
		</button>
	)

	const nameAndLogoForm = () => (
		<>
			<div className="form-group">
				<p className="warning-msg">Logo y nombre para mostrar en los correos a enviar</p>
			</div>
			<div className="form-group">
				<label>Nombre de Tienda</label>
				<input
					type="text"
					placeholder="Ingresar nombre"
					name="name"
					value={name}
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Logo</label>
				{logo ? <img className="uploaded-file" src={logo} alt="uploaded-file"></img> : <span>Sin Logo</span>}
				<Uploader label={logo ? 'Cambiar' : 'Seleccionar'} setImg={uploadLogoHandler} size="sm" noResize />
			</div>
		</>
	)

	const dollarForm = () => (
		<>
			<div className="form-group-hor">
				<label>$ 1 =</label>
				<input
					type="number"
					name="dollarValue"
					value={dollarValue}
					min={0}
					step={0.01}
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const pagoMovilForm = () => (
		<>
			<div className="form-group">
				<label>Banco</label>
				<input
					type="text"
					placeholder="Ingresar banco"
					name="mobileBank"
					value={mobileBank}
					onChange={(e) => onChange(e)}
				></input>
			</div>
			<div className="form-group">
				<label>Teléfono</label>
				<input
					type="text"
					placeholder="Ingresar numero"
					name="mobilePhone"
					value={mobilePhone}
					onChange={(e) => onChange(e)}
				></input>
			</div>
			<div className="form-group">
				<label>Cedula de identidad</label>
				<input
					type="text"
					placeholder="V-18... o E-18..."
					name="mobileID"
					value={mobileID}
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const ivaForm = () => (
		<>
			<div className="form-group">
				<label>% I.V.A</label>
				<input
					type="number"
					name="taxPercentage"
					value={taxPercentage}
					min={0}
					max={25}
					step={0.01}
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const shipmentCostForm = () => (
		<>
			<div className="form-group">
				{/**
				 
				<label>Costo de Envío $</label>
				<input
					type="number"
					name="shipmentCost"
					value={shipmentCost}
					min={0}
					step={1}
					onChange={(e) => onChange(e)}
				></input>
				 */}
				<p className="warning-msg">
					Costo de envío de una orden es calculado según el costo de envío de cada producto
				</p>
			</div>
			<div className="form-group">
				<label>Limite Para Envío Gratis ($)</label>
				<input
					type="number"
					name="shipmentLimit"
					value={shipmentLimit}
					min={0}
					step={1}
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const waitTimeForm = () => (
		<>
			<div className="form-group">
				<label>Días para retirar producto</label>
				<p className="warning-msg mb-qter">
					Se recomienda sumar +2 días si su tienda no abre los fines de semana
				</p>
				<input type="number" name="waitTime" value={waitTime} min={0} onChange={(e) => onChange(e)}></input>
			</div>

			<div className="form-group">
				<label>Días para preparar producto</label>
				<p className="warning-msg mb-qter">Dias necesarios para preparar el producto para su retiro/envío</p>
				<input
					type="number"
					name="waitTimeDelivery"
					value={waitTimeDelivery}
					min={0}
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const mainPageForm = () => (
		<>
			<div className="form-group">
				<label>Titulo</label>
				<input
					type="text"
					placeholder="Ingresar titulo"
					name="title"
					value={title}
					onChange={(e) => onChange(e)}
				></input>
			</div>
			<div className="form-group">
				<label>Mensaje</label>
				<textarea
					placeholder="Ingresar mensaje"
					name="message"
					value={message}
					onChange={(e) => onChange(e)}
					rows={6}
				></textarea>
			</div>
			<div className="form-group">
				<label>Imagen</label>
				{image && <img className="uploaded-file" src={image} alt="uploaded-file"></img>}
				<Uploader label={'Seleccionar'} setImg={uploadFileHandler} />
			</div>

			{saveChangesButton()}

			<ExtraInfoForm
				sections={sections}
				moveSectionUp={moveSectionUp}
				removeSection={removeSection}
				moveSectionDown={moveSectionDown}
				addSection={addSection}
				sectionType={sectionType}
				sectionTitle={sectionTitle}
				sectionText={sectionText}
				sectionImg={sectionImg}
				sectionPosition={sectionPosition}
				onChange={onChange}
				uploadSectionFileHandler={uploadSectionFileHandler}
				formData={formData}
				setFormData={setFormData}
			/>
		</>
	)

	const phoneAndEmailForm = () => (
		<>
			<div className="form-group">
				<label>Teléfono Local</label>
				<input
					type="text"
					placeholder="Ingresar teléfono"
					name="phone"
					value={phone}
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Teléfono Celular</label>
				<input
					type="text"
					placeholder="Ingresar nro de celular"
					name="mobile"
					value={mobile}
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Correo Electrónico</label>
				<h5>Dirección que recibirá correos sobre nuevas ordenes y de contacto para los clientes</h5>
				<input
					type="email"
					placeholder="Ingresar email"
					name="email"
					value={email}
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const openingTimesForm = () => (
		<>
			<div className="form-group">
				{openingTimes &&
					openingTimes.map((time) => (
						<div key={`${time.rangeDays}-${time.rangeTimes}`} className="opening-times">
							<div className="opening-time">
								<span>{time.rangeDays}</span>
								<span>{time.rangeTimes}</span>
							</div>
							<div
								onClick={() =>
									setFormData({
										...formData,
										openingTimes: openingTimes.filter((x) => x !== time),
									})
								}
								className="btn-icon btn-danger"
							>
								<i className="far fa-trash-alt"></i>
							</div>
						</div>
					))}
				<label>Rango Días</label>
				<input
					type="text"
					placeholder="De Lunes a Viernes"
					value={rangeDays}
					name="rangeDays"
					onChange={(e) => setRangeDays(e.target.value)}
				></input>
				<label>Rango Horas</label>
				<input
					type="text"
					placeholder="De --:-- a --:--"
					value={rangeTimes}
					name="rangeTimes"
					onChange={(e) => setRangeTimes(e.target.value)}
				></input>
				{rangeDays && rangeTimes ? (
					<div
						onClick={() =>
							setFormData({
								...formData,
								openingTimes: [...openingTimes, { rangeDays, rangeTimes }],
							})
						}
						className="btn-icon btn-success mt-half"
					>
						<i className="fas fa-plus"></i>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	)

	const socialMediaForm = () => (
		<>
			<div className="form-group">
				<label>Facebook</label>
				<input
					type="text"
					placeholder="Ingresar link de Facebook"
					name="facebook"
					value={facebook}
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Instagram</label>
				<input
					type="text"
					placeholder="Ingresar link de Instagram"
					name="instagram"
					value={instagram}
					onChange={(e) => onChange(e)}
				></input>
			</div>

			<div className="form-group">
				<label>Twitter</label>
				<input
					type="text"
					placeholder="Ingresar link de Twitter"
					name="twitter"
					value={twitter}
					onChange={(e) => onChange(e)}
				></input>
			</div>
		</>
	)

	const localizationForm = () => (
		<>
			<div className="form-group">
				<label>Dirección</label>
				<input
					type="text"
					placeholder="Ingresar dirección"
					name="address"
					value={address}
					onChange={(e) => onChange(e)}
				></input>
				<label>Ciudad</label>
				<input
					type="text"
					placeholder="Ingresar ciudad"
					name="city"
					value={city}
					onChange={(e) => onChange(e)}
				></input>
				<label>Código Postal</label>
				<input
					type="text"
					placeholder="Ingresar código postal"
					name="postalCode"
					value={postalCode}
					onChange={(e) => onChange(e)}
				></input>
				<label>País</label>
				<input
					type="text"
					placeholder="Ingresar país"
					name="country"
					value={country}
					onChange={(e) => onChange(e)}
				></input>
			</div>

			{showMap ? (
				<div className="form-group">
					<label>Cordenadas Google Maps (Seleccionar un punto)</label>
					{mapReady && options && (
						<GMap onMapClick={onMapClick} options={options} overlays={overlays} className="map" />
					)}
					{lat && lng && (
						<div className="mt-half">
							<Message severity="success" text={'Localización Seleccionada'} />
						</div>
					)}
				</div>
			) : (
				<div className="form-group">
					<label>Localización en Google Maps</label>
					<div onClick={() => setUpMap()} className="btn btn-success mt-1">
						Mostrar Mapa
					</div>
				</div>
			)}
		</>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Mi Tienda`} />

	return (
		<div className="edit">
			{htmlHeader()}
			<h3>
				<i className="fas fa-info"></i> Informacion de Tienda
			</h3>
			<div className="line-title"></div>
			<div>
				{loadingUpdate && loadingCreate && <Loader absolute={true} />}
				{loading || !mapReady ? (
					<Loader absolute={true} />
				) : error ? (
					<div className="vertical">
						{error === 'Shop not found' ? (
							<button onClick={() => dispatch(createShop())} className="btn btn-primary mt-2">
								Crear Tienda
							</button>
						) : (
							<Error />
						)}
					</div>
				) : (
					<>
						<form onSubmit={submitHandler}>
							<Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
								<AccordionTab headerClassName="primary-tab" header="Nombre y Logo">
									{nameAndLogoForm()}
									{saveChangesButton()}
								</AccordionTab>
								<AccordionTab headerClassName="primary-tab" header="Dolar x Bolivar">
									{dollarForm()}
									{saveChangesButton()}
								</AccordionTab>
								<AccordionTab headerClassName="primary-tab" header="Pago Movil Datos">
									{pagoMovilForm()}
									{saveChangesButton()}
								</AccordionTab>
								<AccordionTab headerClassName="primary-tab" header="IVA">
									{ivaForm()}
									{saveChangesButton()}
								</AccordionTab>

								<AccordionTab headerClassName="primary-tab" header="Costo de Envío">
									{shipmentCostForm()}
									{saveChangesButton()}
								</AccordionTab>

								<AccordionTab headerClassName="primary-tab" header="Tiempo de Espera">
									{waitTimeForm()}
									{saveChangesButton()}
								</AccordionTab>

								<AccordionTab headerClassName="primary-tab" header="Pagina Principal">
									{mainPageForm()}
									{saveChangesButton()}
								</AccordionTab>

								<AccordionTab headerClassName="primary-tab" header="Telefonos / Email">
									{phoneAndEmailForm()}
									{saveChangesButton()}
								</AccordionTab>

								<AccordionTab headerClassName="primary-tab" header="Horarios">
									{openingTimesForm()}
									{saveChangesButton()}
								</AccordionTab>

								<AccordionTab headerClassName="primary-tab" header="Redes Sociales">
									{socialMediaForm()}
									{saveChangesButton()}
								</AccordionTab>

								<AccordionTab headerClassName="primary-tab" header="Dirección y Localización">
									{localizationForm()}
								</AccordionTab>
							</Accordion>

							<div className="end-options">{saveChangesButton()}</div>
						</form>
					</>
				)}
			</div>
		</div>
	)
}

export default ShopInfoScreen
