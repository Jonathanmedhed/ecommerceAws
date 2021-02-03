import React from 'react'
import MessageItem from '../message/MessageItem'

const PaymentResultMsgsCash = ({ order, isDelivery }) => {
	const orderNotDeliveredMsgs = [
		'Le hemos enviado un email con la información de su orden (Revisar el correo no deseado)',
		isDelivery
			? 'Asegurece de estar en la direccion indicada el dia de la entrega'
			: 'Asegurece de visitarnos a retirar el producto en la fecha indicada',
		isDelivery
			? 'Se agradece tener las denominaciones en billetes indicadas al recibir el producto'
			: 'Se agradece traer las denominaciones en billetes indicadas',
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

export default PaymentResultMsgsCash
