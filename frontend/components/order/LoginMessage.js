import React from 'react'
import Link from 'next/link'

const LoginMessage = ({ order }) => {
	return (
		<div className="form-group">
			<p className="order-login">
				<Link href={`/register?redirect=order/${order._id}`}>
					<span className="mr-half">Regístrate</span>
				</Link>
				ó
				<Link href={`/login?redirect=order/${order._id}`}>
					<span className="mx-half">Ingresa</span>
				</Link>
				para seguir el estado de tu orden, o continuar luego.
			</p>
		</div>
	)
}

export default LoginMessage
