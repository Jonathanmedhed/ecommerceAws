import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import { Accordion, AccordionTab } from 'primereact/accordion'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Loader from '../../components/loader/Loader'
import HtmlHeader from '../../components/html-header/HtmlHeader'
import Error from '../../components/error/Error'
// actions
import { listOrders } from '../../actions/orderActions'
import { checkDate, formatCurrency, numberWithDots } from '../../utilities/utilities'
// constants
import { ORDER_LIST_RESET, ORDER_VIEWED_RESET } from '../../constants/orderConstants'
import { APP_NAME } from '../../config'

const OrderListScreen = () => {
	const router = useRouter()

	const dispatch = useDispatch()

	// Accordion Indexes
	const [activeIndex, setActiveIndex] = useState(null)

	const [globalFilter, setGlobalFilter] = useState([])

	const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop } = shopDetails

	const orderView = useSelector((state) => state.orderView)
	const { success } = orderView

	const [haveNewOrdersCash, setHaveNewOrdersCash] = useState(false)
	const [haveNewOrdersMobile, setHaveNewOrdersMobile] = useState(false)

	if (
		orders &&
		orders.filter((order) => !order.isChecked && order.paymentMethod === 'Efectivo' && order.pickupAt).length > 0 &&
		!haveNewOrdersCash
	) {
		setHaveNewOrdersCash(true)
	}

	if (
		orders &&
		orders.filter((order) => !order.isChecked && order.paymentMethod === 'Pago Movil' && order.isPaid).length > 0 &&
		!haveNewOrdersMobile
	) {
		setHaveNewOrdersMobile(true)
	}

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders())
		} else {
			router.push('/login')
		}

		if (success) {
			dispatch({ type: ORDER_VIEWED_RESET })
			dispatch({ type: ORDER_LIST_RESET })
			dispatch(listOrders())
		}
	}, [dispatch, router, userInfo, success])

	/** Data table stuff */

	// header
	const header = (
		<>
			<div className="datatable-search">
				<input type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."></input>
				<span>Formato Fecha: AAAA-MM-DD</span>
			</div>
			<div className="mt-half">
				<i className="far fa-square color-danger"></i>{' '}
				<span className="f-three-qters">Tiempo de espera vencido</span>
			</div>
		</>
	)

	// row options template
	const actionTemplate = (rowData) => {
		return (
			<div className="table-buttons">
				<button onClick={() => router.push(`/order/${rowData._id}`)} className="btn btn-primary">
					detalles
				</button>
			</div>
		)
	}

	// td templates
	const idBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">ID</span>
				<span className="p-column-value text-break">{rowData._id}</span>
			</div>
		)
	}

	const paymentReferenceBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Referencia PM</span>
				<span className="p-column-value text-break">{rowData.paymentReference}</span>
			</div>
		)
	}

	const userBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Cliente</span>
				<span className="p-column-value">{rowData.buyer}</span>
			</div>
		)
	}

	const dateBodyTemplate = (rowData) => {
		return (
			<div
				className={
					(!rowData.isPaid || !rowData.isDelivered) &&
					rowData.pickupAt &&
					checkDate(rowData.pickupAt) > shop.waitTime
						? 'border-danger'
						: 'td-custom'
				}
			>
				<span className="p-column-title">Fecha</span>
				<span className="p-column-value">{moment(rowData.createdAt).format('DD-MM-YYYY, h:mm:ss a')}</span>
			</div>
		)
	}

	const totalBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Total</span>
				<span className="p-column-value-money">
					{rowData.paymentMethod === 'Efectivo' ? (
						`$${formatCurrency(Number(rowData.totalPrice).toFixed(2))}`
					) : (
						<div className="two-currencies">
							<div className="top">{`${numberWithDots(Math.round(rowData.totalPriceBs))} Bs`}</div>
							<div className="bottom">{`$${formatCurrency(Number(rowData.totalPrice).toFixed(2))}`}</div>
						</div>
					)}
				</span>
			</div>
		)
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Ordenes`} />

	return (
		<>
			{htmlHeader()}
			{loading ? (
				<Loader absolute={true} />
			) : error ? (
				<Error />
			) : (
				<div className="edit">
					<h3>
						<i className="fas fa-cash-register"></i> Ordenes
					</h3>
					<Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
						<AccordionTab
							headerClassName="primary-tab"
							header={
								<div>
									Por Aprobar (Pago Móvil) {haveNewOrdersMobile && <i className="fas fa-circle"></i>}
								</div>
							}
						>
							{orders
								.filter(
									(order) =>
										!order.isApproved &&
										order.isPaid &&
										order.paymentMethod === 'Pago Movil' &&
										!order.isCanceled &&
										(order.user || order.guest)
								)
								.sort((a, b) => {
									return new Date(b.createdAt) - new Date(a.createdAt)
								}).length > 0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter(
												(order) =>
													!order.isApproved &&
													order.isPaid &&
													order.paymentMethod === 'Pago Movil' &&
													!order.isCanceled &&
													(order.user || order.guest)
											)
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column
											field="paymentReference"
											header="Referencia PM"
											body={paymentReferenceBodyTemplate}
											sortable
										></Column>
										<Column
											field={'buyer'}
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										{/**
										<Column field="paidAt" header="Pagada" body={paidBodyTemplate} sortable></Column> */}
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
						<AccordionTab
							headerClassName="primary-tab"
							header={
								<div>
									Por Aprobar (Efectivo) {haveNewOrdersCash && <i className="fas fa-circle"></i>}
								</div>
							}
						>
							{orders.filter(
								(order) =>
									!order.isPaid &&
									order.paymentMethod === 'Efectivo' &&
									!order.isCanceled &&
									order.isSetAside
							).length > 0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter(
												(order) =>
													!order.isPaid &&
													order.paymentMethod === 'Efectivo' &&
													!order.isCanceled &&
													(order.user || order.guest)
											)
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
										<Column
											field="buyer"
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										{/**
								<Column field="paidAt" header="Pagada" body={paidBodyTemplate} sortable></Column> */}
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
						<AccordionTab headerClassName="caution-tab" header="Por Entregar (Pago Móvil)">
							{orders.filter(
								(order) =>
									order.isApproved &&
									!order.isDelivered &&
									order.paymentMethod === 'Pago Movil' &&
									!order.isCanceled
							).length > 0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter(
												(order) =>
													order.isApproved &&
													!order.isDelivered &&
													order.paymentMethod === 'Pago Movil' &&
													!order.isCanceled
											)
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
										<Column
											field="buyer"
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										{/**
									<Column
										field="delivered"
										header="Entregada"
										body={deliveredBodyTemplate}
										sortable
									></Column> */}
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
						<AccordionTab headerClassName="caution-tab" header="Por Entregar (Efectivo)">
							{orders.filter(
								(order) =>
									order.isPaid &&
									!order.isDelivered &&
									order.paymentMethod === 'Efectivo' &&
									!order.isCanceled
							).length > 0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter(
												(order) =>
													order.isPaid &&
													!order.isDelivered &&
													order.paymentMethod === 'Efectivo' &&
													!order.isCanceled
											)
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
										<Column
											field="buyer"
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										{/**
								 * <Column
									field="delivered"
									header="Entregada"
									body={deliveredBodyTemplate}
									sortable
								></Column>
								 */}
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
						<AccordionTab headerClassName="success-tab" header="Completadas (Pago Móvil)">
							{orders.filter(
								(order) =>
									order.isApproved &&
									order.isDelivered &&
									order.isPaid &&
									order.paymentMethod === 'Pago Movil' &&
									!order.isCanceled
							).length > 0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter(
												(order) =>
													order.isApproved &&
													order.isDelivered &&
													order.isPaid &&
													order.paymentMethod === 'Pago Movil' &&
													!order.isCanceled
											)
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
										<Column
											field="buyer"
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
						<AccordionTab headerClassName="success-tab" header="Completadas (Efectivo)">
							{orders.filter(
								(order) =>
									order.isDelivered &&
									order.isPaid &&
									order.paymentMethod === 'Efectivo' &&
									!order.isCanceled
							).length > 0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter(
												(order) =>
													order.isDelivered &&
													order.isPaid &&
													order.paymentMethod === 'Efectivo' &&
													!order.isCanceled
											)
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
										<Column
											field="buyer"
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
						<AccordionTab headerClassName="danger-tab" header="Anuladas (Pago Móvil)">
							{orders.filter((order) => order.isCanceled && order.paymentMethod === 'Pago Movil').length >
							0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter((order) => order.isCanceled && order.paymentMethod === 'Pago Movil')
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
										<Column
											field="buyer"
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
						<AccordionTab headerClassName="danger-tab" header="Anuladas (Efectivo)">
							{orders.filter((order) => order.isCanceled && order.paymentMethod === 'Efectivo').length >
							0 ? (
								<div className="datatable">
									<DataTable
										className="p-datatable-responsive-demo"
										value={orders
											.filter((order) => order.isCanceled && order.paymentMethod === 'Efectivo')
											.sort((a, b) => {
												return new Date(b.createdAt) - new Date(a.createdAt)
											})}
										paginator
										rows={10}
										rowsPerPageOptions={[5, 10, 25]}
										paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
										currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
										header={header}
										globalFilter={globalFilter}
									>
										{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
										<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
										<Column
											field="buyer"
											header="Cliente"
											body={userBodyTemplate}
											sortable
										></Column>
										<Column
											field="createdAt"
											header="Fecha"
											body={dateBodyTemplate}
											sortable
										></Column>
										<Column
											field="totalPrice"
											header="Total"
											body={totalBodyTemplate}
											sortable
										></Column>
										<Column body={actionTemplate}></Column>
									</DataTable>
								</div>
							) : (
								<h3>No hay ordenes</h3>
							)}
						</AccordionTab>
					</Accordion>
				</div>
			)}
		</>
	)
}

export default OrderListScreen
