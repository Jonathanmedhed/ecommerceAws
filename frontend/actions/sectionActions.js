const updateSections = (sections) => {
	let updatedSections = sections.sort((a, b) => {
		return a.position - b.position
	})
	let position = 1
	updatedSections.forEach((section) => {
		section.position = position
		position = position + 1
	})
	return updatedSections
}

export const addSection = (
	sectionTitle,
	sectionText,
	sectionImg,
	sectionType,
	sectionPosition,
	sections,
	formData,
	setFormData
) => (dispatch) => {
	if (
		(sectionType === 'Texto sin Imagen' ||
			sectionType === 'Texto + Imagen de Fondo' ||
			sectionType === 'Texto + Imagen Separados') &&
		(!sectionText || !sectionTitle)
	) {
		dispatch(setAlert('Titulo y Mensaje Requeridos', 'error'))
	} else if (
		(sectionType === 'Imagen sin Texto' ||
			sectionType === 'Texto + Imagen de Fondo' ||
			sectionType === 'Texto + Imagen Separados') &&
		!sectionImg
	) {
		dispatch(setAlert('Imagen Requerida', 'error'))
	} else {
		let updatedSections = sections
		updatedSections.forEach((section) => {
			if (section.position === sectionPosition || section.position >= sectionPosition) {
				section.position = section.position + 1
			}
		})
		updatedSections.push({
			title: sectionTitle && sectionTitle,
			text: sectionText && sectionText,
			img: sectionImg && sectionImg,
			type: sectionType && sectionType,
			position: sectionPosition && sectionPosition,
		})

		setFormData({
			...formData,
			sections: updateSections(updatedSections),
			sectionTitle: '',
			sectionText: '',
			sectionImg: '',
			sectionType: '',
			sectionPosition: 1,
		})
	}
}

export const removeSection = (section, sections, setFormData, formData) => {
	let updatedSections = sections.filter((x) => x !== section)

	let position = 1
	updatedSections.forEach((section) => {
		section.position = position
		position = position + 1
	})

	setFormData({
		...formData,
		sections: updatedSections,
	})
}

export const moveSectionUp = (sectionToMove, sections, setFormData, formData) => {
	let updatedSections = sections

	updatedSections[updatedSections.indexOf(sectionToMove)].position = sectionToMove.position - 1
	updatedSections[updatedSections.indexOf(sectionToMove) - 1].position = sectionToMove.position + 1

	let position = 1
	updatedSections
		.sort((a, b) => {
			return a.position - b.position
		})
		.forEach((section) => {
			section.position = position
			position = position + 1
		})

	setFormData({
		...formData,
		sections: updatedSections,
	})
}

export const moveSectionDown = (sectionToMove, sections, setFormData, formData) => {
	let updatedSections = sections

	updatedSections[updatedSections.indexOf(sectionToMove)].position = sectionToMove.position + 1
	updatedSections[updatedSections.indexOf(sectionToMove) + 1].position = sectionToMove.position - 1

	let position = 1
	updatedSections
		.sort((a, b) => {
			return a.position - b.position
		})
		.forEach((section) => {
			section.position = position
			position = position + 1
		})

	setFormData({
		...formData,
		sections: updatedSections,
	})
}
