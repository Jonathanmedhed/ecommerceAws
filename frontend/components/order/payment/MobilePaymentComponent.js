import React from 'react'
import CalendarForm from '../CalendarForm'
import PaymentSubmitMessages from './PaymentSubmitMessages'
import UserInfoForm from '../UserInfoForm'
import Loader from '../../loader/Loader'
import LoginMessage from '../LoginMessage'

const MobilePaymentComponent = ({
	shop,
	paymentReference,
	paymentHandler,
	onChange,
	userInfo,
	name,
	email,
	phone,
	isDelivery,
	isAdmin,
	isOwner,
	order,
	pickupAt,
	loadingPay,
	isPagoMovil,
	errorPay,
}) => {
	const mobilePaymentInfo = () => (
		<>
			<div className="form-group">
				<label>Banco</label>
				<span>{shop.mobileBank}</span>
			</div>

			<div className="form-group">
				<label>Teléfono</label>
				<span>{shop.mobilePhone}</span>
			</div>

			<div className="form-group">
				<label>Cedula</label>
				<span>{shop.mobileID}</span>
			</div>
		</>
	)

	const mobilePaymentInput = () => (
		<div className="form-group">
			<label>Referencia Pago Móvil</label>
			<input type="text" name="paymentReference" value={paymentReference} onChange={(e) => onChange(e)}></input>
		</div>
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
			{loadingPay ? (
				<Loader text="Procesando Orden..." />
			) : (
				<>
					{!order.isPaid && (
						<div className="options">
							{isPagoMovil && (
								<form className="payment-form" onSubmit={paymentHandler}>
									<h3>Realizar Pago</h3>

									<div className="form-content">
										<h4 className="mt-half">Información Pago Móvil</h4>
										<UserInfoForm
											userInfo={userInfo}
											onChange={onChange}
											name={name}
											email={email}
											phone={phone}
										/>
										{mobilePaymentInfo()}
										{mobilePaymentInput()}
										<CalendarForm
											shop={shop}
											isDelivery={isDelivery}
											isAdmin={isAdmin}
											order={order}
											onChange={onChange}
											pickupAt={pickupAt}
										/>
									</div>

									<PaymentSubmitMessages order={order} errorPay={errorPay} />

									<button type="submit" className="btn btn-primary">
										Enviar
									</button>

									{loggedInInfo()}
								</form>
							)}
						</div>
					)}
				</>
			)}
		</>
	)
}

export default MobilePaymentComponent
