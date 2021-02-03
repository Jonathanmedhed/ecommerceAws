import React from 'react'
import { Dialog } from 'primereact/dialog'

const Dialogue = ({
	order,
	setShowCancelDialog,
	showCancelDialog,
	setCanceledReason,
	canceledReason,
	cancelHandler,
}) => {
	const dialogForm = () => (
		<form>
			<div className="form-group-hor">
				<label>Referencia de pago no valida </label>
				<input
					type="radio"
					name="canceledReason"
					value="Referencia de pago no valida"
					onChange={(e) => setCanceledReason(e.target.value)}
					className="ml-half"
				></input>
			</div>
			<div className="form-group-hor">
				<label>Fecha de retiro caducada </label>
				<input
					type="radio"
					name="canceledReason"
					value="Fecha de retiro caducada"
					onChange={(e) => setCanceledReason(e.target.value)}
					className="ml-half"
				></input>
			</div>
			<div className="form-group">
				<textarea
					placeholder="Ingresar razon"
					value={canceledReason}
					name="canceledReason"
					onChange={(e) => setCanceledReason(e.target.value)}
					rows={6}
				></textarea>
			</div>
		</form>
	)

	const dialogFooter = () => (
		<div className="horizontal">
			<button
				onClick={() => (canceledReason ? cancelHandler(order) : dispatch(setAlert('Razon Requerida', 'error')))}
				className="btn btn-primary"
			>
				Anular
			</button>
			<button onClick={() => setShowCancelDialog(false)} className="btn btn-danger">
				Cancelar
			</button>
		</div>
	)
	return (
		<Dialog
			header="Anular Orden"
			visible={showCancelDialog}
			footer={dialogFooter()}
			onHide={() => setShowCancelDialog(false)}
		>
			{dialogForm()}
		</Dialog>
	)
}

export default Dialogue
