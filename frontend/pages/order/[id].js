import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// components
import Error from '../../components/error/Error'
import Loader from '../../components/loader/Loader'
import Dialogue from '../../components/order/Dialogue'
import OrderInfo from '../../components/order/OrderInfo'
import Summary from '../../components/order/Summary'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import {
	getOrderDetails,
	payOrder,
	setOrderCash,
	deliverOrder,
	approveOrder,
	cancelOrder,
	checkOrder,
	updateOrderDollar,
} from '../../actions/orderActions'
// constants
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
	ORDER_APPROVE_RESET,
	ORDER_CANCEL_RESET,
	ORDER_DETAILS_RESET,
} from '../../constants/orderConstants'
import { APP_NAME } from '../../config'

const OrderScreen = ({ query }) => {
	const orderId = query.id

	const router = useRouter()

	const [canceledReason, setCanceledReason] = useState(null)
	const [showCancelDialog, setShowCancelDialog] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [isOwner, setIsOwner] = useState(false)
	const [isDelivery, setIsDelivery] = useState(false)
	const [isPagoMovil, setIsPagoMovil] = useState(false)

	// Form Values
	const [formData, setFormData] = useState({
		oneDollar: 0,
		twoDollar: 0,
		fiveDollar: 0,
		tenDollar: 0,
		twentyDollar: 0,
		fiftyDollar: 0,
		hundredDollar: 0,
		paymentReference: '',
		pickupAt: null,
		// guest
		name: '',
		email: '',
		phone: '',
	})
	// Form Values Variables
	const {
		oneDollar,
		twoDollar,
		fiveDollar,
		tenDollar,
		twentyDollar,
		fiftyDollar,
		hundredDollar,
		paymentReference,
		pickupAt,
		// guest
		name,
		email,
		phone,
	} = formData

	const dispatch = useDispatch()

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	const orderPay = useSelector((state) => state.orderPay)
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay

	const orderDeliver = useSelector((state) => state.orderDeliver)
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver

	const orderApprove = useSelector((state) => state.orderApprove)
	const { loading: loadingApprove, success: successApprove } = orderApprove

	const orderCancel = useSelector((state) => state.orderCancel)
	const { loading: loadingCancel, success: successCancel } = orderCancel

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading: loadingShop } = shopDetails

	const shopSendEmail = useSelector((state) => state.shopSendEmail)
	const { loading: loadingSendEmail, error: errorSendEmail } = shopSendEmail

	if (!loading) {
		//   Calculate prices
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2)
		}
		if (order) {
			order.itemsPrice = addDecimals(
				order.orderItems && order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
			)
		}
	}

	// Set order as checked
	if (order && !order.isChecked && userInfo && userInfo.isAdmin) {
		dispatch(checkOrder(order))
	}

	useEffect(() => {
		if (!order || successCancel || successPay || successDeliver || successApprove || order._id !== orderId) {
			dispatch({ type: ORDER_APPROVE_RESET })
			dispatch({ type: ORDER_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch({ type: ORDER_CANCEL_RESET })
			dispatch(getOrderDetails(orderId))
			window.scrollTo(0, 0)
		}
		if (order) {
			if (order.user && userInfo && userInfo._id === order.user._id) {
				setIsOwner(true)
			} else {
				setIsOwner(false)
			}
			if (userInfo && userInfo.isAdmin) {
				setIsAdmin(true)
			} else {
				setIsAdmin(false)
			}
			if (order.shippingAddress && order.shippingAddress.address) {
				setIsDelivery(true)
			} else {
				setIsDelivery(false)
			}
			if (order.paymentMethod === 'Pago Movil') {
				setIsPagoMovil(true)
			} else {
				setIsPagoMovil(false)
			}
			if (order.paymentMethod === 'Pago Movil' && !order.isPaid && order.dollarValue !== shop.dollarValue) {
				dispatch(updateOrderDollar(order))
			}
		}
	}, [dispatch, orderId, successPay, successDeliver, successApprove, successCancel, order, userInfo, shop])

	const paymentHandler = (e) => {
		e.preventDefault()
		if (!userInfo) {
			order.guest = { name: name, email: email, phone: phone }
		}
		if (isPagoMovil) {
			dispatch(payOrder(order, paymentReference, pickupAt))
		} else if (!isPagoMovil && !order.isSetAside) {
			dispatch(
				setOrderCash(
					order,
					(
						Number(order.totalPrice) -
						(Number(oneDollar ? oneDollar * 1 : 0) +
							Number(twoDollar ? twoDollar * 2 : 0) +
							Number(fiveDollar ? fiveDollar * 5 : 0) +
							Number(tenDollar ? tenDollar * 10 : 0) +
							Number(twentyDollar ? twentyDollar * 20 : 0) +
							Number(fiftyDollar ? fiftyDollar * 50 : 0) +
							Number(hundredDollar ? hundredDollar * 100 : 0))
					).toFixed(2),
					pickupAt
				)
			)
		}
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order))
	}

	const approveHandler = () => {
		dispatch(approveOrder(order))
	}

	const cancelHandler = () => {
		dispatch(cancelOrder(order, false, canceledReason))
		setCanceledReason(null)
		setShowCancelDialog(false)
	}

	const onChange = (e) => {
		dispatch({ type: ORDER_PAY_RESET })
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const toLogin = () => {
		router.push(`/login?redirect=order/${order._id}`)
		dispatch({ type: ORDER_DETAILS_RESET })
	}

	const loginOptions = () => (
		<div className="access-options">
			<p className="mt-half">Ingrese a su cuenta para poder acceder a la orden</p>
			<button onClick={() => toLogin()} className="btn btn-primary">
				<i className="fas fa-sign-in-alt mr-half"></i> Ingresar
			</button>
		</div>
	)

	const accessViews = () => (
		<>
			{order.user && !userInfo ? (
				<>{loginOptions()}</>
			) : order.user && userInfo && !userInfo.isAdmin && userInfo._id !== order.user._id ? (
				<div className="access-options">
					<p>Su cuenta no esta afiliada a esta orden</p>
				</div>
			) : (
				<div className="order-content">
					<OrderInfo
						order={order}
						userInfo={userInfo}
						isAdmin={isAdmin}
						isOwner={isOwner}
						isPagoMovil={isPagoMovil}
						isDelivery={isDelivery}
						shop={shop}
					/>
					<Summary
						email={email}
						error={error}
						errorPay={errorPay}
						errorSendEmail={errorSendEmail}
						isAdmin={isAdmin}
						isOwner={isOwner}
						isDelivery={isDelivery}
						isPagoMovil={isPagoMovil}
						loadingApprove={loadingApprove}
						loadingCancel={loadingCancel}
						loadingDeliver={loadingDeliver}
						loadingPay={loadingPay}
						loadingSendEmail={loadingSendEmail}
						name={name}
						onChange={onChange}
						order={order}
						paymentHandler={paymentHandler}
						paymentReference={paymentReference}
						phone={phone}
						pickupAt={pickupAt}
						shop={shop}
						userInfo={userInfo}
						oneDollar={oneDollar}
						twoDollar={twoDollar}
						fiveDollar={fiveDollar}
						tenDollar={tenDollar}
						twentyDollar={twentyDollar}
						fiftyDollar={fiftyDollar}
						hundredDollar={hundredDollar}
						deliverHandler={deliverHandler}
						approveHandler={approveHandler}
						setShowCancelDialog={setShowCancelDialog}
					/>
				</div>
			)}
		</>
	)

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Orden`} />

	return (
		<>
			{htmlHeader()}
			{loading || loadingShop ? (
				<Loader absolute />
			) : error ? (
				<Error />
			) : (
				<div className="place-order">
					{
						<Dialogue
							setShowCancelDialog={setShowCancelDialog}
							showCancelDialog={showCancelDialog}
							setCanceledReason={setCanceledReason}
							canceledReason={canceledReason}
							cancelHandler={cancelHandler}
							order={order}
						/>
					}
					<h1>
						<i className="fas fa-tags"></i> Orden {order._id}
					</h1>
					{order.isCanceled && <h3 className="color-danger mt-1">Anulada</h3>}
					{/**
					 * Access views
					 */}
					{accessViews()}
				</div>
			)}
		</>
	)
}

OrderScreen.getInitialProps = ({ query }) => {
	return { query }
}

export default OrderScreen
