import React from 'react'
import CookieConsent from 'react-cookie-consent'

const Cookie = () => {
	return (
		<CookieConsent
			location="bottom"
			buttonText="Entiendo"
			cookieName="cookie"
			expires={150}
			disableStyles={true}
			buttonClasses="btn btn-dark"
			containerClasses="cookies"
			contentClasses="cookies-content"
		>
			Esta pagina utiliza cookies para mejorar su experiencia.
		</CookieConsent>
	)
}

export default Cookie
