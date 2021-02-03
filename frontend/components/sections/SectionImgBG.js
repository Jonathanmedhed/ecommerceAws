import React from 'react'

const SectionImgBG = ({ section }) => {
	return (
		<>
			{(section.type === 'Imagen sin Texto' || section.type === 'Texto + Imagen de Fondo') && (
				<section className="content">
					<img
						className={section.type === 'Imagen sin Texto' ? 'img-alone' : 'home-image'}
						src={section.img}
						alt={section._id}
					></img>
					{section.type === 'Texto + Imagen de Fondo' && (
						<article className="message">
							<h2 className="title">{section.title}</h2>
							<p className="text">{section.text}</p>
						</article>
					)}
				</section>
			)}
		</>
	)
}

export default SectionImgBG
