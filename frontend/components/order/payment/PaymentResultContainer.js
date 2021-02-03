import React from 'react'
import PaymentResultMsgsMobile from './PaymentResultMsgsMobile'
import PaymentResultMsgsCash from './PaymentResultMsgsCash'
import OutOfDateMessage from '../OutOfDateMessage'

const PaymentResultContainer = ({ order, isDelivery, isPagoMovil, shop }) => {
	return (
		<div className="vertical">
			<p className="success-msg">
				<strong>Transacción exitosa</strong>
				{isPagoMovil ? (
					<PaymentResultMsgsMobile order={order} isDelivery={isDelivery} />
				) : (
					<PaymentResultMsgsCash order={order} isDelivery={isDelivery} />
				)}
			</p>
			<OutOfDateMessage order={order} shop={shop} />
		</div>
	)
}

export default PaymentResultContainer
