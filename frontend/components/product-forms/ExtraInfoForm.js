import React from 'react'
import { useDispatch } from 'react-redux'
import Uploader from '../upload/Uploader'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'

const ExtraInfoForm = ({
	sections,
	moveSectionUp,
	removeSection,
	moveSectionDown,
	addSection,
	sectionType,
	sectionTitle,
	sectionText,
	sectionImg,
	sectionPosition,
	onChange,
	uploadSectionFileHandler,
	formData,
	setFormData,
}) => {
	const dispatch = useDispatch()

	return (
		<>
			<div className="form-group">
				{sections && sections.length > 0 && <label className="mt-half">Secciones</label>}
				{sections &&
					sections
						.sort((a, b) => {
							return a.position - b.position
						})
						.map((section) => (
							<div className="section">
								<div className="section-content">
									<span className="sec-pos">{section.position}</span>
									<div className="content">
										{section.title && <span className="sec-title">{section.title}</span>}
										{section.img && <img src={section.img} alt={section._id}></img>}
										<span className="type">{section.type}</span>
									</div>
								</div>
								<div className="section-options">
									{section.position !== 1 && (
										<div
											onClick={() => moveSectionUp(section, sections, setFormData, formData)}
											className="btn-icon btn-caution"
										>
											<i className="fas fa-caret-up"></i>
										</div>
									)}
									<div
										onClick={() => removeSection(section, sections, setFormData, formData)}
										className="btn-icon btn-danger my-qter"
									>
										<i className="far fa-trash-alt"></i>
									</div>
									{section.position !== sections[sections.length - 1].position && (
										<div
											onClick={() => moveSectionDown(section, sections, setFormData, formData)}
											className="btn-icon btn-caution"
										>
											<i className="fas fa-caret-down"></i>
										</div>
									)}
								</div>
							</div>
						))}
				<label className="my-half">Agregar Sección</label>
				<label>Tipo</label>
				<Dropdown
					name={'sectionType'}
					value={sectionType}
					options={[
						'Texto sin Imagen',
						'Imagen sin Texto',
						'Texto + Imagen de Fondo',
						'Texto + Imagen Separados',
					]}
					onChange={(e) => onChange(e)}
					placeholder="Seleccionar tipo"
				/>
				{(sectionType === 'Texto sin Imagen' ||
					sectionType === 'Texto + Imagen de Fondo' ||
					sectionType === 'Texto + Imagen Separados') && (
					<>
						<label>Titulo</label>
						<input
							type="text"
							placeholder="Titulo"
							value={sectionTitle}
							name="sectionTitle"
							onChange={(e) => onChange(e)}
						></input>
					</>
				)}
				{(sectionType === 'Texto sin Imagen' ||
					sectionType === 'Texto + Imagen de Fondo' ||
					sectionType === 'Texto + Imagen Separados') && (
					<>
						<label>Mensaje</label>
						<textarea
							placeholder="Mensaje"
							value={sectionText}
							name="sectionText"
							onChange={(e) => onChange(e)}
							rows={6}
						></textarea>
					</>
				)}
				{(sectionType === 'Imagen sin Texto' ||
					sectionType === 'Texto + Imagen de Fondo' ||
					sectionType === 'Texto + Imagen Separados') && (
					<>
						<label>Imagen</label>
						{sectionImg && <img className="uploaded-file" src={sectionImg} alt="uploaded-file"></img>}
						<Uploader label={'Seleccionar'} setImg={uploadSectionFileHandler} />
					</>
				)}
				{sectionType && (
					<>
						<label>Posición</label>
						<InputNumber
							min={1}
							max={sections.length + 1}
							name="sectionPosition"
							value={sectionPosition}
							onValueChange={(e) => onChange(e)}
							showButtons
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-danger"
							incrementButtonClassName="p-button-success"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
						/>
					</>
				)}
				{sectionType ? (
					<div
						onClick={() =>
							dispatch(
								addSection(
									sectionTitle,
									sectionText,
									sectionImg,
									sectionType,
									sectionPosition,
									sections,
									formData,
									setFormData
								)
							)
						}
						className="btn-icon btn-success mt-half"
					>
						<i className="fas fa-plus"></i>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	)
}

export default ExtraInfoForm
