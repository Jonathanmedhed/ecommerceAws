import React from 'react'
import { useRouter } from 'next/router'

const Error = () => {
	const router = useRouter()

	return (
		<section className="error-component">
			<div className="content">
				<i className="fas fa-exclamation"></i>
				<h2>Error, intente de nuevo</h2>
				<button onClick={() => router.reload()} className="btn btn-primary">
					Actualizar Página
				</button>
			</div>
		</section>
	)
}

export default Error
