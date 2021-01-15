import React, { useState } from 'react'

const Footer = () => {
	const [showPhone, setShowPhone] = useState(false)
	const [showWhatsapp, setShowWhatsapp] = useState(false)
	const [showEmail, setShowEmail] = useState(false)

	const selectSocial = (option) => {
		setShowPhone(false)
		setShowWhatsapp(false)
		setShowEmail(false)

		switch (option) {
			case 'phone':
				setShowPhone(true)
				break
			case 'whatsapp':
				setShowWhatsapp(true)
				break
			case 'email':
				setShowEmail(true)
				break
			default:
				break
		}
	}

	const desktopInfo = () => (
		<>
			{(showEmail || showPhone || showWhatsapp) && (
				<div className="social-info hide-sm">
					{showPhone && '04126289924'}
					{showWhatsapp && '+584126289924'}
					{showEmail && 'heddrichitsolutions@gmail.com'}
				</div>
			)}
		</>
	)

	const contactOptions = () => (
		<div className={showEmail || showPhone || showWhatsapp ? 'social mt-1' : 'social'}>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href={'https://www.instagram.com/heddrichitsoluciones/'}
				className="sub-item"
			>
				<i className="fab fa-instagram"></i>
			</a>
			<a href={`tel:04126289924`} className="sub-item show-sm">
				<i className="fas fa-phone"></i>
			</a>
			<a onClick={() => selectSocial('phone')} className="sub-item hide-sm">
				<i className={showPhone ? 'fas fa-phone bg-light' : 'fas fa-phone'}></i>
			</a>
			<a href={`https://wa.me/+584126289924`} className="sub-item show-sm">
				<i className="fab fa-whatsapp"></i>
			</a>
			<a onClick={() => selectSocial('whatsapp')} className="sub-item hide-sm">
				<i className={showWhatsapp ? 'fab fa-whatsapp bg-light' : 'fab fa-whatsapp'}></i>
			</a>
			<a href={`mailto:heddrichitsolutions@gmail.com`} className="sub-item show-sm">
				<i className="far fa-envelope"></i>
			</a>
			<a onClick={() => selectSocial('email')} className="sub-item hide-sm">
				<i className={showEmail ? 'far fa-envelope bg-light' : 'far fa-envelope'}></i>
			</a>
		</div>
	)

	const logo = () => (
		<div className="logo-section">
			<div className="title">
				<div className="title-content">
					<div className="top">heddrich</div>
					<div className="mid">IT</div>
					<div className="bot">soluciones</div>
				</div>
			</div>
		</div>
	)

	const rights = () => (
		<div className="bottom">
			derechos revervados <i className="far fa-copyright"></i> <strong>heddrich IT soluciones</strong>
		</div>
	)
	return (
		<footer>
			{desktopInfo()}
			{contactOptions()}
			{logo()}
			{rights()}
		</footer>
	)
}

export default Footer
