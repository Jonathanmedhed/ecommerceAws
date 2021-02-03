import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
// components
import { Accordion, AccordionTab } from 'primereact/accordion'
import Error from '../../components/error/Error'
import Loader from '../../components/loader/Loader'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { listMyOrders } from '../../actions/orderActions'
import { formatCurrency, numberWithDots } from '../../utilities/utilities'
// constants
import { APP_NAME } from '../../config'

const MyOrdersScreen = () => {
	const router = useRouter()

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

	// Accordion Indexes
	const [activeIndex, setActiveIndex] = useState(null)

	useEffect(() => {
		if (!userInfo) {
			router.push('/login')
		} else {
			dispatch(listMyOrders())
		}
	}, [dispatch, router, userInfo])

	/** Data table stuff */

	// header
	const header = <h3>Mis Ordenes</h3>

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
				<span className="p-column-value">{rowData._id}</span>
			</div>
		)
	}

	const dateBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
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

	const paidBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Pagada</span>
				<span className="p-column-value">
					{rowData.isPaid ? (
						rowData.paidAt.substring(0, 10)
					) : (
						<i className="fas fa-times" style={{ color: 'red' }}></i>
					)}
				</span>
			</div>
		)
	}

	const deliveredBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Entregada</span>
				<span className="p-column-value">
					{rowData.isDelivered ? (
						rowData.deliveredAt.substring(0, 10)
					) : (
						<i className="fas fa-times" style={{ color: 'red' }}></i>
					)}
				</span>
			</div>
		)
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Mis Ordenes`} />

	return (
		<div className="profile">
			{htmlHeader()}
			<div className="content">
				{loadingOrders ? (
					<Loader absolute={true} />
				) : errorOrders ? (
					<Error />
				) : (
					<div className="orders">
						{orders && orders.length === 0 ? (
							<p className="no-orders">
								No has hecho ordenes, empieza <Link href="/product-selection">aquí </Link>{' '}
							</p>
						) : (
							<>
								<Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
									<AccordionTab headerClassName="caution-tab" header="Por Completar">
										<div className="datatable">
											{orders.filter(
												(order) =>
													(order.paymentMethod === 'Pago Movil' && !order.isPaid) ||
													(order.paymentMethod === 'Efectivo' &&
														!order.isSetAside &&
														!order.isCanceled)
											).length > 0 ? (
												<DataTable
													className="p-datatable-responsive-demo"
													value={orders
														.filter(
															(order) =>
																(order.paymentMethod === 'Pago Movil' &&
																	!order.isPaid) ||
																(order.paymentMethod === 'Efectivo' &&
																	!order.isSetAside &&
																	!order.isCanceled)
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
												>
													{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
													<Column
														field="_id"
														header="ID"
														body={idBodyTemplate}
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
													<Column
														field="isPaid"
														header="Pagada"
														body={paidBodyTemplate}
														sortable
													></Column>
													<Column
														field="isDelivered"
														header="Entregada"
														body={deliveredBodyTemplate}
														sortable
													></Column>
													<Column body={actionTemplate}></Column>
												</DataTable>
											) : (
												<h3>No hay ordenes por completar</h3>
											)}
										</div>
									</AccordionTab>
									<AccordionTab headerClassName="primary-tab" header="Por Retirar o Recibir">
										<div className="datatable">
											{orders.filter(
												(order) =>
													((order.paymentMethod === 'Pago Movil' && order.isPaid) ||
														(order.paymentMethod === 'Efectivo' && order.isSetAside)) &&
													!order.isDelivered &&
													!order.isCanceled
											).length > 0 ? (
												<DataTable
													className="p-datatable-responsive-demo"
													value={orders
														.filter(
															(order) =>
																((order.paymentMethod === 'Pago Movil' &&
																	order.isPaid) ||
																	(order.paymentMethod === 'Efectivo' &&
																		order.isSetAside)) &&
																!order.isDelivered &&
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
												>
													{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
													<Column
														field="_id"
														header="ID"
														body={idBodyTemplate}
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
													<Column
														field="isPaid"
														header="Pagada"
														body={paidBodyTemplate}
														sortable
													></Column>
													<Column
														field="isDelivered"
														header="Entregada"
														body={deliveredBodyTemplate}
														sortable
													></Column>
													<Column body={actionTemplate}></Column>
												</DataTable>
											) : (
												<h3>No tienes ordenes por recibir</h3>
											)}
										</div>
									</AccordionTab>
									<AccordionTab headerClassName="success-tab" header="Completadas">
										<div className="datatable">
											{orders.filter(
												(order) =>
													((order.paymentMethod === 'Pago Movil' && order.isPaid) ||
														(order.paymentMethod === 'Efectivo' && order.isSetAside)) &&
													order.isDelivered &&
													!order.isCanceled
											).length > 0 ? (
												<DataTable
													className="p-datatable-responsive-demo"
													value={orders
														.filter(
															(order) =>
																((order.paymentMethod === 'Pago Movil' &&
																	order.isPaid) ||
																	(order.paymentMethod === 'Efectivo' &&
																		order.isSetAside)) &&
																order.isDelivered &&
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
												>
													{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
													<Column
														field="_id"
														header="ID"
														body={idBodyTemplate}
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
													<Column
														field="isPaid"
														header="Pagada"
														body={paidBodyTemplate}
														sortable
													></Column>
													<Column
														field="isDelivered"
														header="Entregada"
														body={deliveredBodyTemplate}
														sortable
													></Column>
													<Column body={actionTemplate}></Column>
												</DataTable>
											) : (
												<h3>No has completado ordenes</h3>
											)}
										</div>
									</AccordionTab>
									<AccordionTab headerClassName="danger-tab" header="Anuladas">
										<div className="datatable">
											{orders.filter((order) => order.isCanceled).length > 0 ? (
												<DataTable
													className="p-datatable-responsive-demo"
													value={orders
														.filter((order) => order.isCanceled)
														.sort((a, b) => {
															return new Date(b.createdAt) - new Date(a.createdAt)
														})}
													paginator
													rows={10}
													rowsPerPageOptions={[5, 10, 25]}
													paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
													currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes"
													header={header}
												>
													{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
													<Column
														field="_id"
														header="ID"
														body={idBodyTemplate}
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
													<Column
														field="isPaid"
														header="Pagada"
														body={paidBodyTemplate}
														sortable
													></Column>
													<Column
														field="isDelivered"
														header="Entregada"
														body={deliveredBodyTemplate}
														sortable
													></Column>
													<Column body={actionTemplate}></Column>
												</DataTable>
											) : (
												<h3>No tienes ordenes anuladas</h3>
											)}
										</div>
									</AccordionTab>
								</Accordion>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default MyOrdersScreen
