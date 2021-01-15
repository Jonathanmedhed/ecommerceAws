import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

const Loader = ({ text, absolute }) => {
	return (
		<div className={absolute ? 'fixed-loader' : 'loader'}>
			<ProgressSpinner />
			{text && <span className="message">{text}</span>}
		</div>
	)
}

export default Loader
