import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// Prime Components
import { Accordion, AccordionTab } from 'primereact/accordion'
import Loader from '../../../components/loader/Loader'
// Components
import SpecsForm from '../../../components/product-forms/SpecsForm'
import PriceAndInventoryForm from '../../../components/product-forms/PriceAndInventoryForm'
import ImagesForm from '../../../components/product-forms/ImagesForm'
import DiscountForm from '../../../components/product-forms/DiscountForm'
import ExtraInfoForm from '../../../components/product-forms/ExtraInfoForm'
import GeneralInfoForm from '../../../components/product-forms/GeneralInfoForm'
import ExternalLinkForm from '../../../components/product-forms/ExternalLinkForm'
import HtmlHeader from '../../../components/html-header/HtmlHeader'
import ShippingForm from '../../../components/product-forms/ShippingForm'
import Error from '../../../components/error/Error'
// Actions
import { listProductDetails, updateProduct } from '../../../actions/productActions'
import { addSection, moveSectionDown, moveSectionUp, removeSection } from '../../../actions/sectionActions'
// Constants
import { PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_FAIL_RESET } from '../../../constants/productConstants'
import { APP_NAME } from '../../../config'

const ProductEditScreen = ({ query }) => {
	const router = useRouter()

	const dispatch = useDispatch()

	const productId = query.id

	// Accordion Indexes
	const [activeIndex, setActiveIndex] = useState(null)
	const [uploadedImg, setUploadedImg] = useState(null)

	const [spec, setSpec] = useState(null)

	// Form Values
	const [formData, setFormData] = useState({
		name: '',
		price: 0,
		images: [],
		brand: '',
		category: '',
		countInStock: '',
		description: '',
		specs: [],
		discount: 0,
		dealAmount: 0,
		dealDiscount: 0,
		dealQtyFree: 0,
		sections: [],
		externalLink: '',
		shippingCost: 0,
		unitShippingCost: false,
		// Section creation
		sectionTitle: '',
		sectionText: '',
		sectionImg: '',
		sectionType: '',
		sectionPosition: 1,
	})
	// Form Values Variables
	const {
		name,
		price,
		images,
		brand,
		category,
		countInStock,
		description,
		specs,
		discount,
		dealAmount,
		dealDiscount,
		dealQtyFree,
		sections,
		externalLink,
		shippingCost,
		unitShippingCost,
		// Section creation
		sectionTitle,
		sectionText,
		sectionImg,
		sectionType,
		sectionPosition,
	} = formData

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector((state) => state.productUpdate)
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			router.push('/login')
		}
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			dispatch(listProductDetails(productId))
			router.push('/admin/product-list')
		} else {
			if (product && (!product.name || product._id !== productId)) {
				dispatch(listProductDetails(productId))
			} else if (product) {
				setFormData({
					...formData,
					name: product.name,
					price: product.price,
					images: product.images,
					brand: product.brand,
					category: product.category,
					countInStock: product.countInStock,
					description: product.description,
					specs: product.specs,
					discount: product.discount,
					dealAmount: product.deal && product.deal.amount,
					dealDiscount: product.deal && product.deal.discount,
					dealQtyFree: product.deal && product.deal.qtyFree,
					sections: product.sections,
					externalLink: product.externalLink,
					shippingCost: product.shippingCost,
					unitShippingCost: product.unitShippingCost,
				})
			}
		}
	}, [dispatch, router, productId, product, successUpdate, userInfo])

	const uploadFileHandler = (img) => {
		setFormData({ ...formData, images: [...images, img] })
		setUploadedImg(null)
	}

	const uploadSectionFileHandler = (img) => {
		setFormData({ ...formData, sectionImg: img })
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				images,
				brand,
				category,
				description,
				countInStock,
				specs,
				discount,
				deal: { amount: Number(dealAmount), discount: Number(dealDiscount), qtyFree: Number(dealQtyFree) },
				sections,
				externalLink,
				shippingCost,
				unitShippingCost,
			})
		)
	}

	const onChange = (e) => {
		dispatch({ type: PRODUCT_UPDATE_FAIL_RESET })
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const saveChangesButton = () => (
		<button type="submit" className="btn btn-primary mt-half">
			Guardar Cambios
		</button>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Editar Producto`} />
	return (
		<div className="edit">
			{htmlHeader()}
			<h3>
				<i className="fas fa-box"></i> Modificar Producto
			</h3>
			<div>
				{loadingUpdate ? (
					<Loader absolute={true} />
				) : (
					<>
						{loading ? (
							<Loader absolute />
						) : error ? (
							<Error />
						) : (
							<>
								<form onSubmit={submitHandler}>
									<Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
										<AccordionTab headerClassName="primary-tab" header="Informacion General">
											<GeneralInfoForm
												name={name}
												brand={brand}
												category={category}
												description={description}
												onChange={onChange}
											/>
											{saveChangesButton()}
										</AccordionTab>

										<AccordionTab headerClassName="primary-tab" header="Especificaciones">
											<SpecsForm
												specs={specs}
												setFormData={setFormData}
												formData={formData}
												spec={spec}
												setSpec={setSpec}
											/>
											{saveChangesButton()}
										</AccordionTab>

										<AccordionTab headerClassName="primary-tab" header="Precio e Inventario">
											<PriceAndInventoryForm
												price={price}
												countInStock={countInStock}
												onChange={onChange}
											/>
											{saveChangesButton()}
										</AccordionTab>

										<AccordionTab headerClassName="primary-tab" header="Costo de envio">
											<ShippingForm
												shippingCost={shippingCost}
												unitShippingCost={unitShippingCost}
												setFormData={setFormData}
												formData={formData}
												onChange={onChange}
											/>
											{saveChangesButton()}
										</AccordionTab>

										<AccordionTab headerClassName="primary-tab" header="Imagenes">
											<ImagesForm
												images={images}
												formData={formData}
												setFormData={setFormData}
												uploadedImg={uploadedImg}
												setUploadedImg={setUploadedImg}
												uploadFileHandler={uploadFileHandler}
											/>
											{saveChangesButton()}
										</AccordionTab>

										<AccordionTab headerClassName="primary-tab" header="Descuentos y Ofertas">
											<DiscountForm
												discount={discount}
												dealAmount={dealAmount}
												dealDiscount={dealDiscount}
												dealQtyFree={dealQtyFree}
												onChange={onChange}
											/>
											{saveChangesButton()}
										</AccordionTab>

										<AccordionTab headerClassName="primary-tab" header="Informacion Extra">
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
											{saveChangesButton()}
										</AccordionTab>

										<AccordionTab headerClassName="primary-tab" header="Enlace Mercado Libre">
											<ExternalLinkForm externalLink={externalLink} onChange={onChange} />
										</AccordionTab>
									</Accordion>

									<div className="end-options">
										{saveChangesButton()}

										<Link href="/admin/product-list">
											<span className="btn btn-danger mt-half">Regresar</span>
										</Link>
									</div>
								</form>
							</>
						)}
					</>
				)}
			</div>
		</div>
	)
}

ProductEditScreen.getInitialProps = ({ query }) => {
	return { query }
}

export default ProductEditScreen
