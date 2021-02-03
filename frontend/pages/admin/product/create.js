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
// Actions
import { createProduct } from '../../../actions/productActions'
import { addSection, moveSectionDown, moveSectionUp, removeSection } from '../../../actions/sectionActions'
// Constants
import { PRODUCT_CREATE_RESET, PRODUCT_CREATE_FAIL_RESET } from '../../../constants/productConstants'
import { APP_NAME } from '../../../config'

const ProductEditScreen = () => {
	const router = useRouter()

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
		// Section creation
		sectionTitle,
		sectionText,
		sectionImg,
		sectionType,
		sectionPosition,
	} = formData

	const dispatch = useDispatch()

	const productCreate = useSelector((state) => state.productCreate)
	const { loading, error, success } = productCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			router.push('/login')
		}
		if (success) {
			dispatch({ type: PRODUCT_CREATE_RESET })
			router.push('/admin/product-list')
		}
	}, [dispatch, router, success, userInfo])

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
			createProduct({
				name,
				price,
				description,
				images,
				brand,
				category,
				countInStock,
				specs,
				discount,
				deal: { amount: dealAmount, discount: dealDiscount, qtyFree: dealQtyFree },
				sections,
				externalLink,
			})
		)
	}

	const onChange = (e) => {
		dispatch({ type: PRODUCT_CREATE_FAIL_RESET })
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const createButton = () => (
		<button type="submit" className="btn btn-primary mt-half">
			Crear
		</button>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Crear Producto`} />

	return (
		<div className="edit">
			{htmlHeader()}
			<h3>
				<i className="fas fa-box"></i> Crear Producto
			</h3>
			<div>
				{loading ? (
					<Loader absolute={true} />
				) : (
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
								{createButton()}
							</AccordionTab>

							<AccordionTab headerClassName="primary-tab" header="Especificaciones">
								<SpecsForm
									specs={specs}
									setFormData={setFormData}
									formData={formData}
									spec={spec}
									setSpec={setSpec}
								/>
								{createButton()}
							</AccordionTab>

							<AccordionTab headerClassName="primary-tab" header="Precio e Inventario">
								<PriceAndInventoryForm price={price} countInStock={countInStock} onChange={onChange} />
								{createButton()}
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
								{createButton()}
							</AccordionTab>

							<AccordionTab headerClassName="primary-tab" header="Descuentos y Ofertas">
								<DiscountForm
									discount={discount}
									dealAmount={dealAmount}
									dealDiscount={dealDiscount}
									dealQtyFree={dealQtyFree}
									onChange={onChange}
								/>
								{createButton()}
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
								{createButton()}
							</AccordionTab>

							<AccordionTab headerClassName="primary-tab" header="Enlace Mercado Libre">
								<ExternalLinkForm externalLink={externalLink} onChange={onChange} />
							</AccordionTab>
						</Accordion>

						<div className="end-options">
							{createButton()}

							<Link href="/admin/product-list">
								<span className="btn btn-danger mt-half">Regresar</span>
							</Link>
						</div>
					</form>
				)}
			</div>
		</div>
	)
}

export default ProductEditScreen
