import React from 'react'
import SectionImgBG from '../sections/SectionImgBG'
import SectionTextOnly from '../sections/SectionTextOnly'
import SectionImgAndText from '../sections/SectionImgAndText'

const ExtraInfoSection = ({ product }) => {
	return (
		<>
			{product.sections &&
				product.sections.map((section) => (
					<div className="home-section">
						<SectionImgBG section={section} />
						<SectionTextOnly section={section} />
						<SectionImgAndText section={section} item={product} />
					</div>
				))}
		</>
	)
}

export default ExtraInfoSection
