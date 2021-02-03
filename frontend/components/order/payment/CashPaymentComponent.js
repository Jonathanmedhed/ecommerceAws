import React from 'react'
import UserInfoForm from '../UserInfoForm'
import CalendarForm from '../CalendarForm'
import PaymentSubmitMessages from './PaymentSubmitMessages'
import PaymentResultContainer from './PaymentResultContainer'
import BillsForm from '../BillsForm'
import LoginMessage from '../LoginMessage'

const CashPaymentComponent = ({
	order,
	shop,
	userInfo,
	loadingSendEmail,
	loadingPay,
	isDelivery,
	isAdmin,
	isOwner,
	isPagoMovil,
	paymentHandler,
	onChange,
	name,
	email,
	phone,
	oneDollar,
	twoDollar,
	fiveDollar,
	tenDollar,
	twentyDollar,
	fiftyDollar,
	hundredDollar,
	pickupAt,
	errorPay,
}) => {
	const orderCancelledMessage = () => (
		<p className="warning-msg">
			<strong>Orden anulada</strong>
			<div className="content">
				<span className="msg-item">
					<i className="fas fa-circle mr-half"></i>
					<span>{order.canceledReason}</span>
				</span>
			</div>
		</p>
	)

	const loggedInInfo = () => (
		<>
			{!order.isPaid && !order.isSetAside && !isAdmin && isOwner ? (
				<div className="form-group">
					<h5>Puedes continuar con esta operación luego, accediendo en 'Mis Ordenes'</h5>
					{order.paymentMethod === 'Pago Movil' ? <h5>(Precios en Bs podrían aumentar)</h5> : <></>}
				</div>
			) : (
				!order.isPaid && !order.isSetAside && !isAdmin && !isOwner && <LoginMessage order={order} />
			)}
		</>
	)

	return (
		<>
			{(order.isPaid || order.isSetAside) &&
			((order.user && userInfo && userInfo._id === order.user._id) || order.guest) &&
			(!userInfo || (userInfo && !userInfo.isAdmin)) &&
			!loadingSendEmail &&
			!loadingPay ? (
				<div className="item-bottom">
					{!order.isCanceled ? (
						<PaymentResultContainer order={order} isDelivery={isDelivery} shop={shop} />
					) : (
						<>{orderCancelledMessage()}</>
					)}
				</div>
			) : (
				!loadingSendEmail &&
				!loadingPay && (
					<>
						{!isPagoMovil && !order.isSetAside && (
							<form className="payment-form" onSubmit={paymentHandler}>
								<h3>Apartar Producto</h3>
								<div className="form-content">
									<UserInfoForm
										userInfo={userInfo}
										onChange={onChange}
										name={name}
										email={email}
										phone={phone}
									/>
									<h4>Numero de Billetes</h4>

									<BillsForm
										order={order}
										onChange={onChange}
										oneDollar={oneDollar}
										twoDollar={twoDollar}
										fiveDollar={fiveDollar}
										tenDollar={tenDollar}
										twentyDollar={twentyDollar}
										fiftyDollar={fiftyDollar}
										hundredDollar={hundredDollar}
									/>

									<CalendarForm
										shop={shop}
										isDelivery={isDelivery}
										isAdmin={isAdmin}
										order={order}
										onChange={onChange}
										pickupAt={pickupAt}
									/>

									<PaymentSubmitMessages order={order} errorPay={errorPay} />
								</div>
								<button type="submit" className="btn btn-primary">
									Enviar
								</button>
								{loggedInInfo()}
							</form>
						)}
					</>
				)
			)}
		</>
	)
}

export default CashPaymentComponent
