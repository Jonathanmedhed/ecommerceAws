import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Compress from 'compress.js'
import { setAlert } from '../../actions/alertActions'
import { FileUpload } from 'primereact/fileupload'
import Loader from '../loader/Loader'
import { API } from '../../config'

const Uploader = ({ label, setImg, size, noResize }) => {
	// Submition state to show spinner
	const [submition, setSubmition] = useState(false)
	// uploaded file
	const [file, setFile] = useState(null)

	const dispatch = useDispatch()

	const onFormSubmit = async (e) => {
		setImg(null)
		if (noResize) {
			getSignedRequest(file)
		} else {
			let smallerFile = await resizeImageFn(file)
			getSignedRequest(smallerFile)
		}
	}

	const onChange = (e) => {
		setSubmition(true)
		const files = e.files
		const file = files[0]
		if (file == null) {
			dispatch(setAlert('Ningun archivo seleccionado', 'error'))
		}
		setFile(file)
	}

	const compress = new Compress()
	const resizeImageFn = async (file) => {
		const resizedImage = await compress.compress([file], {
			size: 2, // the max size in MB, defaults to 2MB
			quality: 1, // the quality of the image, max is 1,
			maxWidth: size === 'sm' ? 300 : size === 'md' ? 500 : 800, // the max width of the output image, defaults to 1920px
			maxHeight: size === 'sm' ? 300 : size === 'md' ? 500 : 600, // the max height of the output image, defaults to 1920px
			resize: true, // defaults to true, set false if you do not want to resize the image width and height
		})
		const img = resizedImage[0]
		const base64str = img.data
		const imgExt = img.ext
		const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
		resizedFiile.name = `${Date.now()}-${file.name}`
		return resizedFiile
	}

	const getSignedRequest = (file) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', `${API}/upload/sign-s3?file-name=${file.name}&file-type=${file.type}`)
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText)
					uploadFile(file, response.signedRequest, response.url)
				} else {
					dispatch(setAlert('Error, Intentar de nuevo', 'error'))
					setSubmition(false)
				}
			}
		}
		xhr.send()
	}

	const uploadFile = (file, signedRequest, url) => {
		const xhr = new XMLHttpRequest()
		xhr.open('PUT', signedRequest)
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					setImg(url)
					dispatch(setAlert('Imagen subida', 'success'))
					setSubmition(false)
				} else {
					dispatch(setAlert('Error, Intentar de nuevo', 'error'))
					setSubmition(false)
				}
			}
		}
		xhr.send(file)
	}

	return (
		<div className="vertical mt-1">
			{submition && <Loader />}
			<FileUpload
				className={submition ? 'btn btn-gray' : 'btn btn-primary'}
				mode="basic"
				name="myImage"
				accept="image/*"
				onSelect={onChange}
				onProgress={onFormSubmit}
				auto
				chooseLabel={submition ? 'subiendo...' : label}
				disabled={submition}
			/>
		</div>
	)
}

export default Uploader
