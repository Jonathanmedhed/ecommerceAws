import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import Error from '../../components/error/Error'
import CheckOutBox from '../../components/cart/CheckOutBox'
import ItemList from '../../components/cart/ItemList'
import Loader from '../../components/loader/Loader'
import CurrencySwitch from '../../components/currency-switch/CurrencySwitch'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { removeFromCart } from '../../actions/cartActions'
// constants
import { CART_UPDATE } from '../../constants/cartConstants'
import { APP_NAME } from '../../config'

const CartScreen = () => {
	const router = useRouter()

	const [changeCurrency, setChangeCurrency] = useState(false)

	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop, loading, error } = shopDetails

	useEffect(() => {
		dispatch({ type: CART_UPDATE })
	}, [dispatch])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		//router.push('/login?redirect=payment')
		router.push('/cart/shipping')
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Carro de Compra`} />
	return (
		<>
			{htmlHeader()}
			{loading || !cart ? (
				<Loader absolute={true} />
			) : error ? (
				<Error />
			) : (
				<>
					<div className="cart">
						<div className="switch-container">
							<CurrencySwitch value={changeCurrency} setValue={setChangeCurrency} absolute />
						</div>
						<ItemList
							items={cartItems}
							changeCurrency={changeCurrency}
							shop={shop}
							removeFromCartHandler={removeFromCartHandler}
						/>
						<CheckOutBox
							cart={cart}
							cartItems={cartItems}
							changeCurrency={changeCurrency}
							checkoutHandler={checkoutHandler}
						/>
					</div>
				</>
			)}
		</>
	)
}

export default CartScreen
