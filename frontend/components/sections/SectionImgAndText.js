import React from 'react'

const SectionImgAndText = ({ section, item }) => {
	return (
		<>
			{section.type === 'Texto + Imagen Separados' && (
				<section
					className={
						section.position === 1
							? 'content-separated'
							: section.position === 2 &&
							  item.sections[item.sections.indexOf(section) - 1].type === 'Texto + Imagen Separados'
							? 'content-separated-rev'
							: section.position > 2 &&
							  item.sections[item.sections.indexOf(section) - 1].type === 'Texto + Imagen Separados' &&
							  item.sections[item.sections.indexOf(section) - 2].type !== 'Texto + Imagen Separados'
							? 'content-separated-rev'
							: 'content-separated'
					}
				>
					<article className="separated-content">
						<img className="home-image" src={section.img} alt={section._id}></img>
						<div className="message">
							<h2 className="title">{section.title}</h2>
							<p className="text">{section.text}</p>
						</div>
					</article>
				</section>
			)}
		</>
	)
}

export default SectionImgAndText
