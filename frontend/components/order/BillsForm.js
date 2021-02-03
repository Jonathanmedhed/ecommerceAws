import React from 'react'
import { InputNumber } from 'primereact/inputnumber'

const BillsForm = ({
	order,
	onChange,
	oneDollar,
	twoDollar,
	fiveDollar,
	tenDollar,
	twentyDollar,
	fiftyDollar,
	hundredDollar,
}) => {
	return (
		<>
			<div className="form-group-hor">
				<label>$ 1</label>
				<InputNumber
					min={0}
					name="oneDollar"
					value={oneDollar}
					onValueChange={(e) => onChange(e)}
					showButtons
					buttonLayout="horizontal"
					decrementButtonClassName="p-button-danger"
					incrementButtonClassName="p-button-success"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
				/>
			</div>
			<div className="form-group-hor">
				<label>$ 2</label>
				<InputNumber
					min={0}
					name="twoDollar"
					value={twoDollar}
					onValueChange={(e) => onChange(e)}
					showButtons
					buttonLayout="horizontal"
					decrementButtonClassName="p-button-danger"
					incrementButtonClassName="p-button-success"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
				/>
			</div>
			<div className="form-group-hor">
				<label>$ 5</label>
				<InputNumber
					min={0}
					name="fiveDollar"
					value={fiveDollar}
					onValueChange={(e) => onChange(e)}
					showButtons
					buttonLayout="horizontal"
					decrementButtonClassName="p-button-danger"
					incrementButtonClassName="p-button-success"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
				/>
			</div>
			<div className="form-group-hor">
				<label>$ 10</label>
				<InputNumber
					min={0}
					name="tenDollar"
					value={tenDollar}
					onValueChange={(e) => onChange(e)}
					showButtons
					buttonLayout="horizontal"
					decrementButtonClassName="p-button-danger"
					incrementButtonClassName="p-button-success"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
				/>
			</div>
			<div className="form-group-hor">
				<label>$ 20</label>
				<InputNumber
					min={0}
					name="twentyDollar"
					value={twentyDollar}
					onValueChange={(e) => onChange(e)}
					showButtons
					buttonLayout="horizontal"
					decrementButtonClassName="p-button-danger"
					incrementButtonClassName="p-button-success"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
				/>
			</div>
			<div className="form-group-hor">
				<label>$ 50</label>
				<InputNumber
					min={0}
					name="fiftyDollar"
					value={fiftyDollar}
					onValueChange={(e) => onChange(e)}
					showButtons
					buttonLayout="horizontal"
					decrementButtonClassName="p-button-danger"
					incrementButtonClassName="p-button-success"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
				/>
			</div>
			<div className="form-group-hor">
				<label>$ 100</label>
				<InputNumber
					min={0}
					name="hundredDollar"
					value={hundredDollar}
					onValueChange={(e) => onChange(e)}
					showButtons
					buttonLayout="horizontal"
					decrementButtonClassName="p-button-danger"
					incrementButtonClassName="p-button-success"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
				/>
			</div>
			<div className="form-group-hor">
				<label>
					Cambio:
					<span
						className={
							(
								Number(oneDollar ? oneDollar * 1 : 0) +
								Number(twoDollar ? twoDollar * 2 : 0) +
								Number(fiveDollar ? fiveDollar * 5 : 0) +
								Number(tenDollar ? tenDollar * 10 : 0) +
								Number(twentyDollar ? twentyDollar * 20 : 0) +
								Number(fiftyDollar ? fiftyDollar * 50 : 0) +
								Number(hundredDollar ? hundredDollar * 100 : 0) -
								Number(order.totalPrice)
							).toFixed(2) < 0
								? 'text-danger'
								: 'text-success'
						}
					>
						{' '}
						$
						{(
							Number(oneDollar ? oneDollar * 1 : 0) +
							Number(twoDollar ? twoDollar * 2 : 0) +
							Number(fiveDollar ? fiveDollar * 5 : 0) +
							Number(tenDollar ? tenDollar * 10 : 0) +
							Number(twentyDollar ? twentyDollar * 20 : 0) +
							Number(fiftyDollar ? fiftyDollar * 50 : 0) +
							Number(hundredDollar ? hundredDollar * 100 : 0) -
							Number(order.totalPrice)
						).toFixed(2)}
					</span>
				</label>
			</div>
		</>
	)
}

export default BillsForm
