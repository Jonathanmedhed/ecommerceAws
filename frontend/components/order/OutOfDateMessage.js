import React from 'react'
import { checkDate } from '../../utilities/utilities'

const OutOfDateMessage = ({ order, shop }) => {
	return (
		<>
			{(!order.isPaid || !order.isDelivered) && order.pickupAt && checkDate(order.pickupAt) > shop.waitTime && (
				<p className="warning-msg">
					<strong>Order Vencida</strong>
					<div className="content">
						<span className="msg-item">
							<i className="fas fa-circle mr-half"></i>
							<span>{`Tiempo de espera (${
								shop.waitTime + 1
							} días) para la pago y retiro de la order, ha culminado`}</span>
						</span>
					</div>
				</p>
			)}
		</>
	)
}

export default OutOfDateMessage
