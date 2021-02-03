import React from 'react'
import { useDispatch } from 'react-redux'
// loader
import Loader from '../loader/Loader'
// actions
import { payOrderCash, cancelOrder } from '../../actions/orderActions'

const AdminOptions = ({
	order,
	deliverHandler,
	approveHandler,
	setShowCancelDialog,
	userInfo,
	loadingCancel,
	isPagoMovil,
}) => {
	const dispatch = useDispatch()

	const setDeliveredOption = () => (
		<>
			{userInfo &&
				userInfo.isAdmin &&
				order.isPaid &&
				(order.isApproved || !isPagoMovil) &&
				!order.isDelivered &&
				!order.isCanceled && (
					<div className="item-bottom">
						<button className="btn btn-primary" onClick={deliverHandler}>
							Marcar como Entregada
						</button>
					</div>
				)}
		</>
	)

	const setApprovedOption = () => (
		<>
			{userInfo && userInfo.isAdmin && !order.isApproved && isPagoMovil && !order.isCanceled && (
				<div className="item-bottom">
					<button className="btn btn-primary" onClick={approveHandler}>
						Marcar como Aprobada
					</button>
				</div>
			)}
		</>
	)

	const setPaidOption = () => (
		<>
			{userInfo && userInfo.isAdmin && !order.isPaid && !isPagoMovil && !order.isCanceled && (
				<div className="item-bottom">
					<button className="btn btn-primary" onClick={() => dispatch(payOrderCash(order))}>
						Marcar como Pagada
					</button>
				</div>
			)}
		</>
	)

	const setCancelledOptions = () => (
		<>
			{loadingCancel ? (
				<Loader />
			) : (
				<>
					{userInfo && userInfo.isAdmin && (!order.isPaid || !order.isDelivered) && !order.isCanceled && (
						<div className="item-bottom">
							<button className="btn btn-danger" onClick={() => setShowCancelDialog(true)}>
								Anular Orden
							</button>
						</div>
					)}
					{userInfo && userInfo.isAdmin && order.isCanceled && (
						<div className="item-bottom">
							<button className="btn btn-primary" onClick={() => dispatch(cancelOrder(order, true))}>
								Activar Orden
							</button>
						</div>
					)}
				</>
			)}
		</>
	)

	return (
		<>
			{setDeliveredOption()}

			{setApprovedOption()}

			{setPaidOption()}

			{setCancelledOptions()}
		</>
	)
}

export default AdminOptions
