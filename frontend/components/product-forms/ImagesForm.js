import React from 'react'
import Uploader from '../upload/Uploader'

const ImagesForm = ({ images, formData, setFormData, uploadedImg, setUploadedImg, uploadFileHandler }) => {
	return (
		<>
			<div className="form-group">
				<label>Imagenes</label>
				{images &&
					images.length > 0 &&
					images.map((img) => (
						<div key={img} className="opening-times">
							<div className="opening-time">
								<img className="uploaded-file" src={img} alt="uploaded-file"></img>
							</div>
							<div
								onClick={() =>
									setFormData({
										...formData,
										images: images.filter((x) => x !== img),
									})
								}
								className="btn-icon btn-danger"
							>
								<i className="far fa-trash-alt"></i>
							</div>
						</div>
					))}
				{uploadedImg ? (
					<div className="uploaded-file-container">
						<img className="uploaded-file" src={uploadedImg} alt="uploaded-file"></img>
						<div className="options">
							<div
								onClick={() => uploadFileHandler(uploadedImg)}
								className="btn-icon btn-success mt-half"
							>
								<i className="fas fa-plus"></i>
							</div>
							<div onClick={() => setUploadedImg(null)} className="btn-icon btn-danger mt-half">
								<i className="far fa-trash-alt"></i>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
				<Uploader label={'seleccionar'} setImg={setUploadedImg} size="md" />
			</div>
		</>
	)
}

export default ImagesForm
