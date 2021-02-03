import React from 'react'
import MessageItem from '../message/MessageItem'

const PaymentResultMsgsMobile = ({ order, isDelivery }) => {
	const orderNotDeliveredMsgs = [
		'Le hemos enviado un email con la información de su orden (Revisar el correo no deseado)',
		order.isApproved ? 'Referencia Verificada' : 'Verificaremos la referencia en las proximas horas',
		isDelivery
			? 'Asegurece de estar en la direccion indicada el dia de la entrega'
			: 'Asegurece de visitarnos a retirar el producto en la fecha indicada',
	]

	return (
		<div className="content">
			{order.isDelivered ? (
				<MessageItem message={'Orden entregada, gracias por su compra'} />
			) : (
				<>
					{orderNotDeliveredMsgs.map((msg) => (
						<MessageItem key={msg} message={msg} />
					))}
				</>
			)}
		</div>
	)
}

export default PaymentResultMsgsMobile
