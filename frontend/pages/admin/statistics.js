import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// Components
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ListBox } from 'primereact/listbox'
import Loader from '../../components/loader/Loader'
import Error from '../../components/error/Error'
import ChartComp from '../../components/chart/Chart'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// Functions
import { shopDetails as getShopDetails } from '../../actions/shopActions'
import { listOrders } from '../../actions/orderActions'
import { listProducts } from '../../actions/productActions'
// Constants
import { APP_NAME } from '../../config'

const StatisticsScreen = () => {
	const router = useRouter()

	// Payment method to show in charts
	const [paymentMethod, setPaymentMethod] = useState('Efectivo')
	// to show qty in charts
	const [showQty, setShowQty] = useState(false)

	// product to show in charts
	const [selectedProduct, setSelectedProduct] = useState(null)

	// Accordion Indexes
	const [activeIndex, setActiveIndex] = useState(null)

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading, error } = shopDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderList = useSelector((state) => state.orderList)
	const { orders, loading: loadingOrders } = orderList

	const productList = useSelector((state) => state.productList)
	const { allProducts: products, loading: loadingProducts } = productList

	const dispatch = useDispatch()

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getShopDetails())
			dispatch(listOrders())
			dispatch(listProducts('', 0))
		} else {
			router.push('/login')
		}
	}, [userInfo, router, dispatch])

	let itemTemplate = (option) => (
		<div className="listbox-item">
			<img src={option.images[0]} alt={option.name}></img>
			<span>{option.name}</span>
		</div>
	)

	const chartOptionsPaymentMethod = () => (
		<div className="chart-options">
			<button
				onClick={() => setPaymentMethod('Pago Movil')}
				className={paymentMethod === 'Pago Movil' ? 'btn btn-dark' : 'btn btn-primary'}
			>
				<i className="fas fa-mobile-alt mr-half"></i> Pago Móvil
			</button>
			<button
				onClick={() => setPaymentMethod('Efectivo')}
				className={paymentMethod !== 'Pago Movil' ? 'btn btn-dark' : 'btn btn-primary'}
			>
				<i className="fas fa-dollar-sign mr-half"></i> Efectivo
			</button>
		</div>
	)

	const chartOptionsIncomeQty = () => (
		<div className="chart-options">
			<button onClick={() => setShowQty(true)} className={showQty ? 'btn btn-dark' : 'btn btn-primary'}>
				Cantidad
			</button>
			<button onClick={() => setShowQty(false)} className={!showQty ? 'btn btn-dark' : 'btn btn-primary'}>
				Ingreso
			</button>
		</div>
	)

	const incomeChart = () => (
		<ChartComp
			data={
				paymentMethod === 'Efectivo'
					? orders &&
					  orders.filter((order) => order.paymentMethod === 'Efectivo' && !order.isCanceled && order.isPaid)
					: orders &&
					  orders.filter(
							(order) =>
								order.paymentMethod !== 'Efectivo' &&
								!order.isCanceled &&
								order.isPaid &&
								order.isApproved
					  )
			}
			onlychart={true}
			type={'transactions'}
			title={'Ingresos'}
			showQty={showQty}
		/>
	)

	const productChart = () => (
		<ChartComp
			data={
				paymentMethod === 'Efectivo'
					? orders &&
					  orders.filter((order) => order.paymentMethod === 'Efectivo' && !order.isCanceled && order.isPaid)
					: orders &&
					  orders.filter(
							(order) =>
								order.paymentMethod !== 'Efectivo' &&
								!order.isCanceled &&
								order.isPaid &&
								order.isApproved
					  )
			}
			onlychart={true}
			type={'product'}
			title={`${selectedProduct ? selectedProduct.name : products && products.length > 0 && products[0].name} ${
				showQty ? '(Cantidad)' : '(Ingreso)'
			}`}
			productId={selectedProduct ? selectedProduct._id : products && products.length > 0 && products[0]._id}
			showQty={showQty}
		/>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Estadística`} />

	return (
		<div className="edit">
			{htmlHeader()}
			<h3>
				<i className="fas fa-chart-line"></i> Estadística
			</h3>
			<div>
				{loading || loadingOrders || loadingProducts ? (
					<Loader absolute={true} />
				) : error ? (
					<div className="vertical">
						<Error />
					</div>
				) : (
					shop &&
					orders &&
					products && (
						<Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
							<AccordionTab headerClassName="primary-tab" header="Ventas">
								<div className="stats-content">
									{chartOptionsPaymentMethod()}
									{chartOptionsIncomeQty()}
									{incomeChart()}
								</div>
							</AccordionTab>

							<AccordionTab headerClassName="primary-tab" header="Ventas x Producto">
								<div className="stats-content">
									{chartOptionsPaymentMethod()}
									{chartOptionsIncomeQty()}
									<ListBox
										value={selectedProduct}
										filter={true}
										filterBy={'name'}
										options={products && products}
										onChange={(e) => setSelectedProduct(e.value)}
										itemTemplate={itemTemplate}
										style={{ width: '15em', margin: '0 0 0.5rem 0' }}
										listStyle={{ maxHeight: '250px' }}
									/>
									{productChart()}
								</div>
							</AccordionTab>
						</Accordion>
					)
				)}
			</div>
		</div>
	)
}

export default StatisticsScreen
