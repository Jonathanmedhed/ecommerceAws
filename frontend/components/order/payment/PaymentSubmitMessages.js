import React from 'react'
import Message from '../../alerts/Message'

const PaymentSubmitMessages = ({ order, errorPay }) => {
	return (
		<>
			{order.paidAt && (
				<div className="pb-half m-auto">
					<Message severity="success" text={`Pago Procesado`} />
				</div>
			)}
			{errorPay && (
				<div className="py-half m-auto">
					<Message severity="error" text={errorPay} />
				</div>
			)}
		</>
	)
}

export default PaymentSubmitMessages
