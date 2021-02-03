import React from 'react'
import moment from 'moment'
import Message from '../../components/alerts/Message'

const InfoPaymentMethod = ({ order, isPagoMovil, isAdmin, isOwner }) => {
	const showPaymentReference = () => (
		<>
			{isPagoMovil && order.paidAt && (
				<div className="address-item">
					<div className="label">Referencia: </div>{' '}
					<div className="value">
						{isAdmin || isOwner ? order.paymentReference : `...` + order.paymentReference.slice(-3)}
					</div>
				</div>
			)}
		</>
	)

	const showCashChange = () => (
		<>
			{!isPagoMovil && order.isSetAside ? (
				<div className="address-item">
					<div className="label">Cambio: </div> <div className="value">${order.change}</div>
				</div>
			) : (
				<></>
			)}
		</>
	)

	const showPaymentStatus = () => (
		<>
			{order.isPaid ? (
				<Message
					severity="success"
					text={`Pagada el ${moment(order.paidAt).format('DD/MM/YYYY, h:mm:ss a')}`}
				/>
			) : (
				<Message severity="error" text={`No Pagada`} />
			)}
		</>
	)

	return (
		<div className="info-item">
			<h2>
				<i className="fas fa-cash-register"></i> Método de Pago
			</h2>
			<div className="address-item">
				<div className="label">Método: </div> <div className="value">{order.paymentMethod}</div>
			</div>
			{showPaymentReference()}
			{showCashChange()}
			{showPaymentStatus()}
		</div>
	)
}

export default InfoPaymentMethod
