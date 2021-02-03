import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Sidebar } from 'primereact/sidebar'
import { SlideMenu } from 'primereact/slidemenu'
import { logout } from '../../actions/userActions'
import { Menubar } from 'primereact/menubar'
import { shopDetails as getShopDetails } from '../../actions/shopActions'
import { listOrders } from '../../actions/orderActions'
// constants
import { ORDER_VIEWED_RESET, ORDER_LIST_RESET } from '../../constants/orderConstants'
import { APP_NAME } from '../../config'

const Header = () => {
	const router = useRouter()

	const dispatch = useDispatch()

	const [showSidebar, setShowSidebar] = useState(false)

	const [haveNewOrders, setHaveNewOrders] = useState(false)

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const shopDetails = useSelector((state) => state.shopDetails)
	const { shop } = shopDetails

	const orderList = useSelector((state) => state.orderList)
	const { orders } = orderList

	const orderView = useSelector((state) => state.orderView)
	const { success } = orderView

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const logoutHandler = () => {
		dispatch(logout())
	}

	useEffect(() => {
		if (!shop || !shop.email) {
			dispatch(getShopDetails())
		}
		if (!orders) {
			dispatch(listOrders())
		}
		if (success) {
			setHaveNewOrders(false)
			dispatch({ type: ORDER_VIEWED_RESET })
			dispatch({ type: ORDER_LIST_RESET })
			dispatch(listOrders())
		}

		if (
			orders &&
			orders.filter(
				(order) =>
					(!order.isChecked && order.paymentMethod === 'Pago Movil' && order.isPaid) ||
					(!order.isChecked && order.paymentMethod === 'Efectivo' && order.pickupAt)
			).length > 0 &&
			!haveNewOrders
		) {
			setHaveNewOrders(true)
		}
	}, [shop, orders, dispatch, success, haveNewOrders])

	const homeItem = (isDropdown) =>
		router.pathname !== '/' && {
			label: 'Inicio',
			className: isDropdown ? 'option-down' : 'option',
			command: (event) => {
				router.push('/')
				setShowSidebar(false)
			},
		}

	const productsItem = (isDropdown) =>
		true && {
			label: 'Productos',
			className:
				router && router.pathname === '/product-selection'
					? isDropdown
						? 'option-down-highlighted'
						: 'option-highlighted'
					: isDropdown
					? 'option-down'
					: 'option',
			command: (event) => {
				router.push('/product-selection')
				setShowSidebar(false)
			},
		}

	const contactItem = (isDropdown) =>
		true && {
			label: 'Contacto',
			className:
				router && router.pathname === '/contactus'
					? isDropdown
						? 'option-down-highlighted'
						: 'option-highlighted'
					: isDropdown
					? 'option-down'
					: 'option',
			command: (event) => {
				router.push('/contact-us')
				setShowSidebar(false)
			},
		}

	const myAccountItem = (isDropdown) =>
		userInfo
			? {
					label: 'Mi Cuenta',
					className:
						router && router.pathname === '/user/profile'
							? isDropdown
								? 'option-down-highlighted'
								: 'option-highlighted'
							: isDropdown
							? 'option-down'
							: 'option',
					command: (event) => {
						router.push('/user/profile')
						setShowSidebar(false)
					},
			  }
			: { className: 'hide' }

	const myOrdersItem = (isDropdown) =>
		userInfo
			? {
					label: 'Mis Ordenes',
					className:
						router && router.pathname === '/myorders'
							? isDropdown
								? 'option-down-highlighted'
								: 'option-highlighted'
							: isDropdown
							? 'option-down'
							: 'option',
					command: (event) => {
						router.push('/user/my-orders')
						setShowSidebar(false)
					},
			  }
			: { className: 'hide' }

	const statisticsItem = {
		label: 'Estadística',
		className: router && router.pathname === '/admin/statistics' ? 'option-down-highlighted' : 'option-down',
		command: (event) => {
			router.push('/admin/statistics')
			setShowSidebar(false)
		},
	}

	const adminProductsItem = {
		label: 'Productos',
		className: router && router.pathname === '/admin/productlist' ? 'option-down-highlighted' : 'option-down',
		command: (event) => {
			router.push('/admin/product-list')
			setShowSidebar(false)
		},
	}

	const adminUsersItem = {
		label: 'Usuarios',
		className: router && router.pathname === '/admin/userlist' ? 'option-down-highlighted' : 'option-down',
		command: (event) => {
			router.push('/admin/user-list')
			setShowSidebar(false)
		},
	}

	const myStoreItem = {
		label: 'Mi Tienda',
		className: router && router.pathname === '/admin/shop-info' ? 'option-highlighted' : 'option',
		command: (event) => {
			router.push('/admin/shop-info')
			setShowSidebar(false)
		},
	}

	const adminOrdersItem = {
		label: 'Ordenes',
		className: router && router.pathname === '/admin/order-list' ? 'option-highlighted' : 'option',
		icon: haveNewOrders && 'fas fa-caret-right highlight',
		command: (event) => {
			router.push('/admin/order-list')
			setShowSidebar(false)
		},
	}

	const logoutItem = (isDropdown) =>
		true && {
			label: 'Salir',
			icon: 'fas fa-sign-out-alt mr-half',
			className: isDropdown ? 'option-down' : 'option',
			command: (event) => {
				logoutHandler()
				setShowSidebar(false)
			},
		}

	const loginItem = {
		label: 'Ingresar/Registro',
		icon: 'fas fa-sign-in-alt mr-half',
		className: 'option',
		command: (event) => {
			router.push('/login')
			setShowSidebar(false)
		},
	}

	const items = [homeItem(), productsItem(), contactItem()]

	const itemsAdmin = [
		{}, // otherwise next item wont get styled for some reason xD
		myStoreItem,
		adminOrdersItem,
		{
			icon: 'fas fa-plus mr-qter',
			className: 'option',
			items: [statisticsItem, adminUsersItem, adminProductsItem],
		},
		{
			label: 'Secciones',
			icon: 'far fa-window-restore mr-qter',
			className: 'option',
			items: [homeItem(true), productsItem(true), contactItem(true)],
		},
	]

	const sideBarItems = [
		homeItem(),
		productsItem(),
		contactItem(),
		myAccountItem(),
		myOrdersItem(),
		userInfo && userInfo.isAdmin
			? {
					label: 'Admin',
					icon: haveNewOrders ? 'fas fa-user-shield highlight' : 'fas fa-user-shield',
					className: router && router.pathname.includes('/admin') ? 'option-highlighted' : 'option',
					items: [myStoreItem, statisticsItem, adminOrdersItem, adminProductsItem, adminUsersItem],
			  }
			: { className: 'hide' },
		userInfo ? logoutItem(true) : loginItem,
	]

	const sideBarItemsAdmin = [
		homeItem(),
		myStoreItem,
		statisticsItem,
		adminProductsItem,
		adminOrdersItem,
		adminUsersItem,
		myAccountItem(),
		myOrdersItem(),
		{
			label: 'Secciones',
			icon: 'far fa-window-restore mr-qter',
			className: 'option',
			items: [productsItem(), contactItem()],
		},
		{
			label: 'Salir',
			icon: 'fas fa-sign-out-alt mr-half',
			className: 'option',
			command: (event) => {
				logoutHandler()
				setShowSidebar(false)
			},
		},
	]

	const itemsUser = [
		userInfo && {
			label: userInfo.name.length > 10 ? <i className="fas fa-user-alt"></i> : userInfo.name,
			className: router && router.pathname === '/user/profile' ? 'option-self-highlighted' : 'option-self',
			items: [myAccountItem(true), myOrdersItem(true), logoutItem(true)],
		},
	]

	const nameAndLogo = () => (
		<div className="title">
			<div
				className={haveNewOrders ? 'menu-button highlight' : 'menu-button'}
				onClick={() => setShowSidebar(true)}
			>
				<i className="fas fa-bars"></i>
			</div>
			<Link href="/">
				<span className="logo">
					<img src={'../static/images/logo-example.png'} alt="shop-logo"></img>
				</span>
			</Link>
			<Link href="/">
				<div className="text">{APP_NAME}</div>
			</Link>
		</div>
	)

	const shoppingCart = () => (
		<>
			{!(userInfo && userInfo.isAdmin) && (
				<>
					{cartItems && cartItems.length > 0 ? (
						<Link href="/cart/content">
							<span className="cart-container">
								<i className="fas fa-shopping-cart"></i>
								<span className="qty">{cartItems.length}</span>
							</span>
						</Link>
					) : (
						<>
							<div className="hide-sm">
								<i className="fas fa-shopping-cart color-dark mr-1"></i>
							</div>
							<div className="show-sm">
								{router.pathname !== '/product-selection' ? (
									<Link href="/product-selection">
										<span className="option">
											<i className="fas fa-shopping-bag"></i>
										</span>
									</Link>
								) : (
									<></>
								)}
							</div>
						</>
					)}
				</>
			)}
		</>
	)

	const authOptions = () => (
		<>
			{!userInfo ? (
				<Link href="/login">
					<span className="option-self">
						<i className="fas fa-sign-in-alt"></i> Ingresar
					</span>
				</Link>
			) : (
				<div className="nav-sm">
					<Menubar model={itemsUser} />
				</div>
			)}
		</>
	)

	const sideBar = () => (
		<Sidebar visible={showSidebar} onHide={() => setShowSidebar(false)}>
			<div className="title-sidebar">
				{shop && shop.logo && (
					<Link href="/">
						<span className="logo-sm">
							<img src={shop.logo} alt="shop-logo"></img>
						</span>
					</Link>
				)}
				<Link href="/">
					<div className="text">{shop && shop.name}</div>
				</Link>
			</div>
			<SlideMenu model={userInfo && userInfo.isAdmin ? sideBarItemsAdmin : sideBarItems} />
		</Sidebar>
	)

	return (
		<header className={shop && shop.logo ? 'navbar' : 'navbar py-1'}>
			<div className="content">
				<Menubar
					start={<>{nameAndLogo()}</>}
					end={
						<div className="login-cart">
							{userInfo && userInfo.isAdmin && (
								<Link href={'/admin/order-list'}>
									<span className="option">
										{haveNewOrders && <i className="fas fa-caret-right highlight"></i>} Ordenes
									</span>
								</Link>
							)}
							{shoppingCart()}
							{authOptions()}
						</div>
					}
					model={userInfo && userInfo.isAdmin ? itemsAdmin : items}
				/>
				{sideBar()}
			</div>
		</header>
	)
}

export default Header
