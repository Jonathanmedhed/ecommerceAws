import React from 'react'

const SectionTextOnly = ({ section }) => {
	return (
		<>
			{section.type === 'Texto sin Imagen' && (
				<section className="content-text">
					<article className="message">
						<h2 className="title">{section.title}</h2>
						<p className="text">{section.text}</p>
					</article>
				</section>
			)}
		</>
	)
}

export default SectionTextOnly
