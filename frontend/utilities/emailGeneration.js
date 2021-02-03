import moment from 'moment'
import { DOMAIN } from '../config'

const generateItemList = (order) => {
	try {
		let itemsString = ''
		let itemsStringHtml = ''

		order.orderItems.forEach((item) => {
			itemsString = itemsString + '\n' + item.name + ' ' + 'x' + ' ' + item.qty
		})

		order.orderItems.forEach((item) => {
			itemsStringHtml =
				itemsStringHtml +
				'\n' +
				`<li><a href="${DOMAIN}/product/${item.product}">${item.name}</a> <strong> x ${item.qty}</strong></li>`
		})

		return { itemsText: itemsString, itemsHtml: itemsStringHtml }
	} catch (error) {
		console.log(error)
	}
}

const getUserName = (order) => {
	return order.user ? order.user.name : order.guest && order.guest.name
}

const getDeliveryInfo = (order) => {
	let deliveryPart =
		order.shippingAddress && order.shippingAddress.address
			? `Fecha de envío: ${moment(order.pickupAt).format('DD/MM/YYYY')}`
			: `Fecha para retiro: ${moment(order.pickupAt).format('DD/MM/YYYY')}`
	let deliveryPartHtml =
		order.shippingAddress && order.shippingAddress.address
			? `Fecha de envío: <strong>${moment(order.pickupAt).format('DD/MM/YYYY')}</strong>`
			: `Fecha para retiro: <strong>${moment(order.pickupAt).format('DD/MM/YYYY')}</strong>`

	return { deliveryPart, deliveryPartHtml }
}

const getMoneyInfo = (order, toAdmin, reason) => {
	return toAdmin
		? ''
		: order.paymentMethod === 'Efectivo'
		? '\nRecuerde tener el dinero en las denominaciones indicadas para cancelar su pedido\n'
		: reason !== 'aprobada'
		? 'Verificaremos la referencia en las próximas horas y le enviaremos un correo con la confirmación'
		: ''
}

const getShippingInfo = (order) => {
	return order.shippingAddress && order.shippingAddress.address
		? '\n\nDirección de envío:' + '\n' + order.shippingAddress.address + ', ' + order.shippingAddress.city
		: ''
}

const getPaymentInfo = (order) => {
	return order.paymentMethod === 'Pago Movil' ? '\n\nReferencia: ' + `${order.paymentReference}` : ''
}

const getPaymentInfoHtml = (order) => {
	return order.paymentMethod === 'Pago Movil' ? '\n\nReferencia: ' + `<strong>${order.paymentReference}</strong>` : ''
}

const textToSendUser = (shop, order, userName, deliveryPart, moneyPart, itemsText, generalInfo, reason) => {
	return (
		'Usuario ' +
		userName +
		'\n' +
		'\n' +
		`Nos complace informarle que su orden ${order._id} ha sido ${reason} \n` +
		'\n' +
		deliveryPart +
		'\n' +
		moneyPart +
		'\n' +
		`Productos:` +
		itemsText +
		generalInfo +
		`\n\nPara mas información siga el enlace: \n${DOMAIN}/order/${order._id}\n` +
		`\n\nEste es un correo automatizado. \nContáctenos en nuestro correo ${shop.email} si tiene alguna duda \nGracias por su compra \n\n` +
		shop.name +
		'\n' +
		shop.email +
		'\n' +
		shop.phone +
		''
	)
}

const textToSendAdmin = (order, deliveryPart, moneyPart, userName, itemsText) => {
	return (
		`Nueva Orden Recibida (${order.paymentMethod})` +
		'\n' +
		'\n' +
		`Orden: ${order._id}\n` +
		'\n' +
		deliveryPart +
		'\n' +
		moneyPart +
		'\n' +
		`Usuario: ${userName}` +
		'\n' +
		'\n' +
		`Productos:` +
		itemsText +
		`\n\nPara mas información siga el link: \n${DOMAIN}/order/${order._id}\n` +
		``
	)
}

const emailHeader = (shop) => {
	return `<div style="text-align: center; background-color: #0e4263; color: white; margin: 0; padding: 0.5rem 0 0 0 0;">
<img width="50" height="50" src="${shop.logo}"></img>
<h2 style="text-align: center; background-color: #0e4263; color: white; margin: 0">${shop.name}</h2>
</div>`
}

const userNameIntro = (userName, toAdmin) => {
	return `<h3 style="font-weight: 100;">${`Usuario${toAdmin ? ':' : ''} ` + `<strong>${userName}</strong>`} </h3>`
}

const moreOrderInfo = (order, toAdmin) => {
	return `<p>Para mas información sobre ${toAdmin ? 'la' : 'su'} orden ingrese <a href='${DOMAIN}/order/${
		order._id
	}'>aquí</a></p>`
}

const emailFooter = (shop) => {
	return `<p>Este es un correo automatizado.</p>
    <p>Contáctenos en nuestro correo ${shop.email} si tiene alguna duda</p>
    <p>Gracias por su compra</p>
    <p><strong>${shop.name}</strong></p>
    <p>${shop.email}</p>
    <p>${shop.phone}</p>`
}
const htmlToSendUser = (shop, order, userName, deliveryPartHtml, moneyPart, itemsHtml, generalInfoHtml, reason) => {
	return `
    <div style="border: solid 2px #0e4263; border-radius: 0.2rem;">
    ${emailHeader(shop)}
    <div style='padding: 0 1rem 1rem 1rem;'>
    ${userNameIntro(userName)}
	<p>${reason === 'anulada' ? 'Le informamos' : 'Nos complace informarle'} que su orden ${order._id} ha sido ${reason}</p>
	<p>${reason === 'anulada' ? `Razon:` : ''}</p>
	<p>${reason === 'anulada' ? `<span style="color: red;">${order.canceledReason}</span>` : ''}</p>
    <p>${reason === 'anulada' ? '' : deliveryPartHtml}</p>
    <p>${reason === 'anulada' ? '' : moneyPart}</p>
    <p>Productos:</p>
    <ul>${itemsHtml}</ul>
    <p>${reason === 'anulada' ? '' : generalInfoHtml}</p>
    ${moreOrderInfo(order)}
    ${emailFooter(shop)}
    </div>
    </div>
`
}

const orderReceivedIntro = (order) => {
	return `<h3 style="font-weight: 100;">${`Nueva Orden Recibida ` + `<strong>${order.paymentMethod}</strong>`} </h3>`
}

const htmlToSendAdmin = (shop, order, userName, deliveryPartHtml, itemsHtml) => {
	return `
    <div style="border: solid 2px #0e4263; border-radius: 0.2rem;">
    ${emailHeader(shop)}
    <div style='padding: 0 1rem 1rem 1rem;'>
    ${orderReceivedIntro(order)}
    <p>Orden: ${order._id}</p>
    <p>${deliveryPartHtml}</p>
    ${userNameIntro(userName, true)}
    <p>Productos:</p>
    <ul>${itemsHtml}</ul>
    ${moreOrderInfo(order, true)}
    </div>
    </div>
`
}

export const generateEmail = (order, shop, reason, toAdmin) => {
	try {
		let { itemsText, itemsHtml } = generateItemList(order)
		let userName = getUserName(order)

		let { deliveryPart, deliveryPartHtml } = getDeliveryInfo(order)

		let moneyPart = getMoneyInfo(order, toAdmin, reason)

		let shippingInfo = getShippingInfo(order)

		let paymentInfo = getPaymentInfo(order)

		let paymentInfoHtml = getPaymentInfoHtml(order)

		let generalInfo = paymentInfo + '' + shippingInfo + ''

		let generalInfoHtml = `<p>${paymentInfoHtml}</p>` + '' + `<p>${shippingInfo}</p>`

		let text = toAdmin
			? textToSendAdmin(order, deliveryPart, moneyPart, userName, itemsText)
			: textToSendUser(shop, order, userName, deliveryPart, moneyPart, itemsText, generalInfo, reason)

		let html = toAdmin
			? htmlToSendAdmin(shop, order, userName, deliveryPartHtml, itemsHtml)
			: htmlToSendUser(shop, order, userName, deliveryPartHtml, moneyPart, itemsHtml, generalInfoHtml, reason)

		return { emailText: text, emailHtml: html }
	} catch (error) {
		console.log(error)
	}
}
