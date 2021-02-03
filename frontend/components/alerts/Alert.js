import React from 'react'
import { useSelector } from 'react-redux'
// PrimeReact Component
import { Message } from 'primereact/message'

const Alert = () => {
	const alerts = useSelector((state) => state.alerts)

	return (
		<>
			{alerts !== null &&
				alerts &&
				alerts.length > 0 &&
				alerts.map((alert) => (
					<div className="message-absolute">
						<Message
							severity={alert.alertType}
							text={
								alert.msg && alert.msg.title ? (
									<div className="comp-alert">
										<span className="title">{alert.msg.title}</span>
										<span className="text">{alert.msg.text}</span>
									</div>
								) : (
									alert.msg
								)
							}
						/>
					</div>
				))}
		</>
	)
}

export default Alert
