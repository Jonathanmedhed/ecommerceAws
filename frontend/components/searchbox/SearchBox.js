import React, { useState } from 'react'

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/products/search/${keyword}`)
		} else {
			history.push('/products')
		}
	}

	return (
		<form className="search-box" onSubmit={submitHandler}>
			<input
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder=" Buscar Productos..."
			></input>
			<button type="submit" className="btn btn-primary">
				Buscar
			</button>
		</form>
	)
}

export default SearchBox
