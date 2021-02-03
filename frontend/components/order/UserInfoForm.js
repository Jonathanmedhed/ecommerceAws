import React from 'react'

const UserInfoForm = ({ userInfo, onChange, name, email, phone }) => {
	return (
		<>
			{!userInfo && (
				<>
					<div className="form-group">
						<label>Nombre</label>
						<input
							placeholder="Ingrese su nombre"
							type="text"
							name="name"
							value={name}
							onChange={(e) => onChange(e)}
						></input>
					</div>
					<div className="form-group">
						<label>Correo Electrónico</label>
						<input
							placeholder="Ingrese su correo"
							type="text"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
						></input>
					</div>
					<div className="form-group">
						<label>Nro de Teléfono</label>
						<input
							placeholder="Ingresar numero de teléfono"
							type="text"
							name="phone"
							value={phone}
							onChange={(e) => onChange(e)}
						></input>
					</div>
				</>
			)}
		</>
	)
}

export default UserInfoForm
