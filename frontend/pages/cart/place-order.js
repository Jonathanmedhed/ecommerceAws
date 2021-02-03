import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import Error from '../../components/error/Error'
import CheckoutSteps from '../../components/checkout-steps/CheckoutSteps'
import Loader from '../../components/loader/Loader'
import CartInfo from '../../components/cart/CartInfo'
import CheckOutPlaceOrderBox from '../../components/cart/CheckOutPlaceOrderBox'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { createOrder } from '../../actions/orderActions'
// constants
import { APP_NAME } from '../../config'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'

const PlaceOrderScreen = () => {
	const router = useRouter()

	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)

	//   Calculate prices
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error } = orderCreate

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading, error: errorShop } = shopDetails

	cart.itemsPrice = cart.subTotal

	let totalShippingCost =
		cart.cartItems && cart.cartItems.reduce((acc, item) => acc + (item.shippingCost ? item.shippingCost : 0), 0)

	cart.shippingPrice =
		cart.shippingAddress && cart.shippingAddress.address
			? shop && shop.shipmentCost
				? shop.shipmentLimit
					? cart.itemsPrice >= shop.shipmentLimit
						? 0
						: totalShippingCost
					: totalShippingCost
				: 0
			: 0

	cart.taxPrice =
		shop && cart.paymentMethod === 'Pago Movil'
			? addDecimals(Number(((shop.taxPercentage / 100) * cart.itemsPrice).toFixed(2)))
			: 0
	cart.totalPrice = (Number(cart.total) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

	useEffect(() => {
		if (success) {
			router.push(`/order/${order._id}`)
			dispatch({ type: ORDER_CREATE_RESET })
		}
		// eslint-disable-next-line
	}, [router, success, shop, cart, order])

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
				totalPriceBs: Number(cart.totalPrice * shop.dollarValue).toFixed(0),
				dollarValue: shop.dollarValue,
				totalDiscount: Number(cart.discountTotal) + Number(cart.freeAmount),
			})
		)
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Realizar Pedido`} />

	return (
		<>
			{htmlHeader()}
			{!shop || !cart || loading ? (
				<Loader absolute={true} />
			) : errorShop ? (
				<Error />
			) : (
				<div className="place-order">
					<CheckoutSteps step2 step3 step4 current={4} />
					<div className="order-content">
						<CartInfo cart={cart} shop={shop} />
						<div className="order-summary">
							<h2>Resumen de Orden</h2>

							<CheckOutPlaceOrderBox cart={cart} shop={shop} />

							<button
								className="btn btn-primary"
								disabled={cart.cartItems === 0}
								onClick={placeOrderHandler}
							>
								Realizar Pedido
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default PlaceOrderScreen
