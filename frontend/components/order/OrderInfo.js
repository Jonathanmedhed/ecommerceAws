import React from 'react'
import moment from 'moment'
// Components
import Message from '../alerts/Message'
import InfoPaymentMethod from './InfoPaymentMethod'
import OrderItem from '../product-order/OrderItem'
import InfoDelivery from './InfoDelivery'

const OrderInfo = ({ order, userInfo, isAdmin, isOwner, isPagoMovil, isDelivery, shop }) => {
	const infoCancellation = () => (
		<>
			{order.isCanceled && (
				<div className="info-item">
					<h2>
						<i class="fas fa-times"></i> Motivo de Anulación
					</h2>
					<p>{order.canceledReason}</p>
				</div>
			)}
		</>
	)

	const infoApproval = () => (
		<>
			{userInfo && userInfo.isAdmin && isPagoMovil && !order.isCanceled && (
				<div className="info-item">
					<h2>
						<i className="fas fa-check"></i> Estado de Aprobación
					</h2>
					{order.isApproved ? (
						<Message
							severity="success"
							text={`Aprobada el ${moment(order.approvedAt).format('DD/MM/YYYY, h:mm:ss a')}`}
						/>
					) : (
						<Message severity="error" text={`No Aprobada`} />
					)}
				</div>
			)}
		</>
	)

	const infoItems = () => (
		<div className="info-item">
			<h2>
				<i className="fas fa-shopping-cart"></i> Articulos en Orden
			</h2>
			{order.orderItems && order.orderItems.length === 0 ? (
				<Message severity="warn" text={`Orden vacía`} />
			) : (
				<div className="item-list">
					{order.orderItems &&
						order.orderItems.map((item) => <OrderItem key={item._id} item={item} order={order} />)}
				</div>
			)}
		</div>
	)

	return (
		<div className="order-info">
			{infoCancellation()}
			{infoApproval()}
			<InfoPaymentMethod order={order} isPagoMovil={isPagoMovil} isAdmin={isAdmin} isOwner={isOwner} />
			<InfoDelivery order={order} isDelivery={isDelivery} isAdmin={isAdmin} isOwner={isOwner} shop={shop} />
			{infoItems()}
		</div>
	)
}

export default OrderInfo
