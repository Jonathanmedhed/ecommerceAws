import React from 'react'

const CurrencySwitch = ({ value, setValue }) => {
	return (
		<div className="switch-currency">
			<div className={value ? 'dollars' : 'dollars-highlighted'}>$</div>
			<label className="switch">
				<input checked={value} onChange={() => setValue(!value)} type="checkbox"></input>
				<span className="slider round"></span>
			</label>
			<div className={value ? 'bs-highlighted' : 'bs'}>Bs</div>
		</div>
	)
}

export default CurrencySwitch
