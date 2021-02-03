import React from 'react'
import { Calendar } from 'primereact/calendar'

const CalendarForm = ({ shop, isDelivery, isAdmin, order, onChange, pickupAt }) => {
	let today = new Date()

	let maxDate = new Date()
	let deliveryStartDate = new Date()
	let deliveryMaxDate = new Date()
	if (shop) {
		maxDate.setDate(maxDate.getDate() + shop.waitTime)
		deliveryStartDate.setDate(deliveryStartDate.getDate() + shop.waitTimeDelivery)
		deliveryMaxDate.setDate(deliveryMaxDate.getDate() + (shop.waitTime + shop.waitTimeDelivery))
	}

	const es = {
		firstDayOfWeek: 1,
		dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
		dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
		dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		monthNames: [
			'enero',
			'febrero',
			'marzo',
			'abril',
			'mayo',
			'junio',
			'julio',
			'agosto',
			'septiembre',
			'octubre',
			'noviembre',
			'diciembre',
		],
		monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
	}

	return (
		<div className="form-group">
			<label>
				Fecha de{' '}
				{isDelivery && isAdmin ? 'entrega ' : isDelivery && !isAdmin ? 'entrega ' : !isAdmin && 'retiro'} de
				producto(s)
			</label>
			<Calendar
				placeholder={'Seleccionar fecha'}
				minDate={order.shippingAddress && order.shippingAddress.address ? deliveryStartDate : today}
				maxDate={order.shippingAddress && order.shippingAddress.address ? deliveryMaxDate : maxDate}
				disabledDays={[0, 6]}
				locale={es}
				dateFormat="dd/mm/yy"
				name="pickupAt"
				value={pickupAt}
				onChange={(e) => onChange(e)}
			></Calendar>
		</div>
	)
}

export default CalendarForm
