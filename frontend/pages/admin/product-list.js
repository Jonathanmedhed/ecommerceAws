import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Column } from 'primereact/column'
import Error from '../../components/error/Error'
import Loader from '../../components/loader/Loader'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { listProducts, deleteProduct } from '../../actions/productActions'
// constants
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import { APP_NAME } from '../../config'

const ProductListScreen = () => {
	const router = useRouter()
	// data table states
	const [selectedProducts, setSelectedProducts] = useState([])
	const [globalFilter, setGlobalFilter] = useState([])
	const [productToDelete, setProductToDelete] = useState(null)

	const dispatch = useDispatch()

	// reducer values
	const productList = useSelector((state) => state.productList)
	const { loading, error, allProducts } = productList

	const productDelete = useSelector((state) => state.productDelete)
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			router.push('/login')
		}

		dispatch({ type: PRODUCT_CREATE_RESET })

		if (!userInfo || !userInfo.isAdmin) {
			router.push('/login')
		}

		if (successCreate) {
			router.push(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts('', '1'))
		}
	}, [dispatch, router, userInfo, successDelete, successCreate, createdProduct])

	// delete product handler
	const deleteHandler = (id) => {
		dispatch(deleteProduct(id))
		setProductToDelete(null)
	}

	/** Data table stuff */

	// header
	const header = (
		<>
			<input type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."></input>

			<Link href={'/admin/product/create'}>
				<span className="btn btn-primary">
					<i className="fas fa-plus"></i> Crear Producto
				</span>
			</Link>
		</>
	)

	// row options template
	const actionTemplate = (rowData) => {
		return (
			<div className="table-buttons">
				<button onClick={() => router.push(`/product/${rowData._id}`)} className="btn-icon btn-success">
					<i class="far fa-eye"></i>
				</button>
				<button onClick={() => router.push(`/admin/product/${rowData._id}`)} className="btn-icon btn-caution">
					<i className="far fa-edit"></i>
				</button>
				{rowData.type !== 'admin' && (
					<button onClick={() => setProductToDelete(rowData)} className="btn-icon btn-danger">
						<i className="far fa-trash-alt"></i>
					</button>
				)}
			</div>
		)
	}

	// td templates
	const brandBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Marca</span>
				<span className="p-column-value">{rowData.brand}</span>
			</div>
		)
	}

	const categoryBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Categoría</span>
				<span className="p-column-value">{rowData.category}</span>
			</div>
		)
	}

	const idBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">ID</span>
				<span className="p-column-value text-break">{rowData._id}</span>
			</div>
		)
	}

	const imageBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Imagen</span>
				<span className="p-column-value">
					<img src={rowData.images[0]} alt={rowData.name}></img>
				</span>
			</div>
		)
	}

	const nameBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Nombre</span>
				<span className="p-column-value">{rowData.name}</span>
			</div>
		)
	}

	const priceBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Precio</span>
				<span className="p-column-value">{rowData.price}</span>
			</div>
		)
	}

	/**
	const ratingBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Calificación</span>
				<span className="p-column-value">
					<Rating value={rowData.rating} reviews={rowData.reviews && rowData.reviews.length} />
				</span>
				<span className="p-column-value">{rowData.numReviews} calificaciones</span>
			</div>
		)
	}
	 */

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Productos`} />

	return (
		<>
			{htmlHeader()}
			<Dialog
				header="Confirmacion"
				visible={productToDelete}
				footer={
					<div className="horizontal">
						<button onClick={() => deleteHandler(productToDelete._id)} className="btn btn-primary">
							Eliminar
						</button>
						<button onClick={() => setProductToDelete(null)} className="btn btn-danger">
							Cancelar
						</button>
					</div>
				}
				onHide={() => setProductToDelete(null)}
			>
				<p>
					Eliminar <strong>{productToDelete && productToDelete.name}</strong>?
				</p>
			</Dialog>
			{loadingDelete && <Loader absolute />}
			{loadingCreate && <Loader absolute />}
			{loading ? (
				<Loader absolute={true} />
			) : error ? (
				<Error />
			) : (
				<div className="datatable">
					<div className="datatable-top">
						<h3>
							<i className="fas fa-boxes"></i> Productos
						</h3>
					</div>
					<DataTable
						className="p-datatable-responsive-demo"
						value={allProducts}
						selection={selectedProducts}
						onSelectionChange={(e) => setSelectedProducts(e.value)}
						paginator
						rows={10}
						rowsPerPageOptions={[5, 10, 25]}
						paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
						globalFilter={globalFilter}
						header={header}
					>
						{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
						<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
						<Column field="name" header="Nombre" body={nameBodyTemplate} sortable></Column>
						<Column field="price" header="Precio" body={priceBodyTemplate} sortable></Column>
						<Column field="brand" header="Marca" body={brandBodyTemplate} sortable></Column>
						<Column field="category" header="Categoría" body={categoryBodyTemplate} sortable></Column>
						{/**
						<Column field="rating" header="Calificación" body={ratingBodyTemplate} sortable></Column>
						 */}
						<Column field="image" header="Imagen" body={imageBodyTemplate}></Column>
						<Column body={actionTemplate}></Column>
					</DataTable>
				</div>
			)}
		</>
	)
}

export default ProductListScreen
