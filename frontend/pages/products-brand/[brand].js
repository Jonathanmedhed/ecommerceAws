import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// components
import CurrencySwitch from '../../components/currency-switch/CurrencySwitch'
import Product from '../../components/product/Product'
import Error from '../../components/error/Error'
import Loader from '../../components/loader/Loader'
import Paginate from '../../components/paginator/Paginate'
import { Dropdown } from 'primereact/dropdown'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { listProducts } from '../../actions/productActions'
// constants
import { APP_NAME, DOMAIN } from '../../config'

const ProductSelectionScreen = ({ query }) => {
	const [keyword, setKeyword] = useState('')

	const pageNumber = (query && query.params && query.params.pageNumber) || 1

	const [changeCurrency, setChangeCurrency] = useState(false)
	const [category, setCategory] = useState(false)
	const [brand, setBrand] = useState((query && query.brand) || false)

	const dispatch = useDispatch()

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading: loadingShop, error: errorShop } = shopDetails

	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	const updatedList = (products, category, brand) => {
		if (!category && !brand) {
			return products
		} else if (category && !brand) {
			return products.filter((product) => product.category === category)
		} else if (!category && brand) {
			return products.filter((product) => product.brand === brand)
		} else if (category && brand) {
			return products.filter((product) => product.brand === brand && product.category === category)
		}
	}

	const searchInput = () => (
		<form className="search-box-alone">
			<div className="content">
				<input
					type="text"
					name="keyword"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder=" Buscar Productos..."
				></input>
				{keyword && (
					<button onClick={() => setKeyword('')} className="btn-icon btn-danger ml-qter">
						<i className="far fa-trash-alt"></i>
					</button>
				)}
			</div>
			{keyword && <p>{`productos encontrados (${products && products.length})`}</p>}
		</form>
	)

	const categoriesDropdown = () => (
		<div className="option">
			<Dropdown
				value={category}
				options={Array.from(
					brand ? products.filter((product) => product.brand === brand) : products,
					(x) => x.category
				)
					.reduce(function (a, b) {
						if (a.indexOf(b) < 0) a.push(b)
						return a
					}, [])
					.sort()}
				onChange={(e) => setCategory(e.value)}
				placeholder="Categorias"
			/>
			{category && (
				<button onClick={() => setCategory(null)} className="btn-icon btn-danger">
					<i className="far fa-trash-alt"></i>
				</button>
			)}
		</div>
	)

	const brandsDropdown = () => (
		<div className="option">
			<Dropdown
				value={brand}
				options={Array.from(
					category ? products.filter((product) => product.category === category) : products,
					(x) => x.brand
				)
					.reduce(function (a, b) {
						if (a.indexOf(b) < 0) a.push(b)
						return a
					}, [])
					.sort()}
				onChange={(e) => setBrand(e.value)}
				placeholder="Marcas"
			/>
			{brand && (
				<button onClick={() => setBrand(null)} className="btn-icon btn-danger">
					<i className="far fa-trash-alt"></i>
				</button>
			)}
		</div>
	)
	const searchBox = () => (
		<>
			{(!loading || !loadingShop) && (
				<div className="options">
					<h3>Productos</h3>
					<div className="options-content">
						{searchInput()}
						{categoriesDropdown()}
						{brandsDropdown()}
						<CurrencySwitch value={changeCurrency} setValue={setChangeCurrency} />
					</div>
				</div>
			)}
		</>
	)

	const searchResults = () => (
		<div className="results">
			{keyword ? <p>{`Productos encontrados (${products && products.length})`}</p> : <></>}
			<div className="tags">
				{category ? <span className="category">{category}</span> : <></>}
				{brand ? <span className="brand">{brand}</span> : <></>}
			</div>
		</div>
	)

	const productListContainer = () => (
		<div className="product-list">
			{products.length === 0 ? (
				<h2>No se encontraron productos</h2>
			) : (
				<>
					{updatedList(products, category, brand).map((product) => (
						<Product
							key={product._id}
							product={product}
							currency={!changeCurrency ? '$' : 'Bs'}
							dollarValue={shop.dollarValue}
						/>
					))}
				</>
			)}
		</div>
	)

	const headTemplate = () => (
		<HtmlHeader
			title={`${APP_NAME} | Productos`}
			shortcutIcon={'/static/logo-round.jpg'}
			description={'Ultimos productos tecnologicos en Venezuela'}
			link={`${DOMAIN}/product-selection`}
			ogTitle={`${APP_NAME} | Productos`}
			ogDescription={'Ultimos productos tecnologicos en Venezuela'}
			ogType={'website'}
			ogUrl={`${DOMAIN}/product-selection`}
			ogSiteName={`${APP_NAME}`}
			ogImg={``}
			ogImgSecureUrl={`../static/images/phone.png`}
			ogImgType={'image/png'}
			//fbId={}
		/>
	)

	return (
		<div className={loading || error ? 'products-page-empty' : 'products-page'}>
			{!(loading && loadingShop) && !(error || errorShop) && headTemplate()}
			<>{!(loading && loadingShop) && !(error || errorShop) && searchBox()}</>
			{loading || loadingShop ? (
				<Loader absolute={true} />
			) : errorShop || error ? (
				<Error />
			) : (
				<div className="list-container">
					{searchResults()}
					{productListContainer()}
					<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
				</div>
			)}
		</div>
	)
}

ProductSelectionScreen.getInitialProps = ({ query }) => {
	return { query }
}

export default ProductSelectionScreen
