import React from 'react'
import moment from 'moment'
import Message from '../../components/alerts/Message'

const InfoDelivery = ({ order, isDelivery, isAdmin, isOwner, shop }) => {
	const deliveryTitle = () => (
		<h2>
			{isDelivery ? (
				<i className="fas fa-truck"></i>
			) : !isAdmin ? (
				<i className="fas fa-store-alt"></i>
			) : (
				<i className="fas fa-store-alt"></i>
			)}
			{isDelivery ? ' Datos para Envío' : !isAdmin ? ' Datos para Retiro' : ' Datos para entrega'}
		</h2>
	)

	const buyerName = () => (
		<>
			{isAdmin || isOwner ? (
				order.user && (
					<div className="address-item">
						<div className="label">Nombre: </div> <div className="value">{order.user.name}</div>
					</div>
				)
			) : order.guest ? (
				<div className="address-item">
					<div className="label">Nombre: </div> <div className="value">ocultado por seguridad</div>
				</div>
			) : (
				<></>
			)}
		</>
	)

	const buyerEmail = () => (
		<>
			{isAdmin ? (
				<div className="address-item">
					<div className="label">Email: </div>{' '}
					<a
						className="value"
						href={`mailto:${order.user && order.user.email}${order.guest && order.guest.email}`}
					>
						{order.user && order.user.email}
						{order.guest && order.guest.email}
					</a>
				</div>
			) : isOwner ? (
				<div className="address-item">
					<div className="label">Email: </div> <div className="value">{order.user && order.user.email}</div>
				</div>
			) : (
				order.guest && (
					<div className="address-item">
						<div className="label">Email: </div>{' '}
						<div className="value">...{order.guest.email.slice(-13)}</div>
					</div>
				)
			)}
		</>
	)

	const buyerAddress = () => (
		<>
			{isDelivery ? (
				<>
					<div className="address-item">
						<div className="label">Dirección: </div>{' '}
						<div className="value">
							{(isAdmin || isOwner) && order.shippingAddress && order.shippingAddress.address
								? order.shippingAddress.address
								: 'ocultada por seguridad'}
						</div>
					</div>
					<div className="address-item">
						<div className="label">Ciudad: </div>{' '}
						<div className="value">{order.shippingAddress && order.shippingAddress.city}</div>
					</div>
					<div className="address-item">
						<div className="label">Código Postal:</div>{' '}
						<div className="value">{order.shippingAddress && order.shippingAddress.postalCode}</div>
					</div>
					<div className="address-item">
						<div className="label">País:</div>{' '}
						<div className="value">{order.shippingAddress && order.shippingAddress.country}</div>
					</div>
				</>
			) : (
				<>
					<div className="address-item">
						<div className="label">Dirección: </div> <div className="value">{shop.address}</div>
					</div>
					<div className="address-item">
						<div className="label">Ciudad: </div> <div className="value">{shop.city}</div>
					</div>
					<div className="address-item">
						<div className="label">Código Postal:</div> <div className="value">{shop.postalCode}</div>
					</div>
					<div className="address-item">
						<div className="label">País:</div> <div className="value">{shop.country}</div>
					</div>
				</>
			)}
		</>
	)

	const deliveryDate = () => (
		<>
			{order.pickupAt && (
				<div className="address-item">
					<div className="label">Fecha:</div>{' '}
					<div className="value">{moment(order.pickupAt).format('DD/MM/YYYY')}</div>
				</div>
			)}
		</>
	)

	const deliveryStatus = () => (
		<>
			{order.isDelivered ? (
				<Message
					severity="success"
					text={`Entregada el ${moment(order.deliveredAt).format('DD/MM/YYYY, h:mm:ss a')}`}
				/>
			) : (
				<Message severity="error" text={`No Entregada`} />
			)}
		</>
	)

	return (
		<div className="info-item">
			{deliveryTitle()}

			{buyerName()}

			{buyerEmail()}

			{buyerAddress()}

			{deliveryDate()}

			{deliveryStatus()}
		</div>
	)
}

export default InfoDelivery
