import React from 'react'
import Loader from '../loader/Loader'
import SummaryBreakdown from './SummaryBreakdown'
import MobilePaymentComponent from './payment/MobilePaymentComponent'
import CashPaymentComponent from './payment/CashPaymentComponent'
import AdminOptions from './AdminOptions'

const Summary = ({
	email,
	errorPay,
	errorSendEmail,
	isAdmin,
	isOwner,
	isDelivery,
	isPagoMovil,
	loadingApprove,
	loadingCancel,
	loadingDeliver,
	loadingPay,
	loadingSendEmail,
	name,
	onChange,
	order,
	paymentHandler,
	paymentReference,
	phone,
	pickupAt,
	shop,
	userInfo,
	oneDollar,
	twoDollar,
	fiveDollar,
	tenDollar,
	twentyDollar,
	fiftyDollar,
	hundredDollar,
	deliverHandler,
	approveHandler,
	setShowCancelDialog,
}) => {
	return (
		<div className="order-summary">
			<h2>Resumen de Orden</h2>

			<SummaryBreakdown order={order} shop={shop} isPagoMovil={isPagoMovil} isDelivery={isDelivery} />

			<MobilePaymentComponent
				shop={shop}
				paymentReference={paymentReference}
				paymentHandler={paymentHandler}
				onChange={onChange}
				userInfo={userInfo}
				name={name}
				email={email}
				phone={phone}
				isDelivery={isDelivery}
				isAdmin={isAdmin}
				isOwner={isOwner}
				order={order}
				pickupAt={pickupAt}
				loadingPay={loadingPay}
				isPagoMovil={isPagoMovil}
				errorPay={errorPay}
			/>

			<CashPaymentComponent
				order={order}
				shop={shop}
				userInfo={userInfo}
				loadingSendEmail={loadingSendEmail}
				loadingPay={loadingPay}
				isDelivery={isDelivery}
				isAdmin={isAdmin}
				isPagoMovil={isPagoMovil}
				paymentHandler={paymentHandler}
				onChange={onChange}
				name={name}
				email={email}
				phone={phone}
				oneDollar={oneDollar}
				twoDollar={twoDollar}
				fiveDollar={fiveDollar}
				tenDollar={tenDollar}
				twentyDollar={twentyDollar}
				fiftyDollar={fiftyDollar}
				hundredDollar={hundredDollar}
				pickupAt={pickupAt}
				errorPay={errorPay}
			/>

			{loadingDeliver && <Loader />}

			{loadingApprove && <Loader />}

			{loadingSendEmail && !loadingApprove && !loadingPay && !loadingCancel && (
				<Loader text="Procesando Orden..." />
			)}

			{errorSendEmail && <Message severity="error" text={errorSendEmail} />}

			<AdminOptions
				order={order}
				deliverHandler={deliverHandler}
				approveHandler={approveHandler}
				setShowCancelDialog={setShowCancelDialog}
				userInfo={userInfo}
				loadingCancel={loadingCancel}
				isPagoMovil={isPagoMovil}
			/>
		</div>
	)
}

export default Summary
