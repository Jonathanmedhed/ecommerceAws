import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// components
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Column } from 'primereact/column'
import Error from '../../components/error/Error'
import Loader from '../../components/loader/Loader'
import HtmlHeader from '../../components/html-header/HtmlHeader'
// actions
import { listUsers, deleteUser } from '../../actions/userActions'
// Constants
import { APP_NAME } from '../../config'

const UserListScreen = () => {
	const router = useRouter()
	// data table states
	const [selectedUsers, setSelectedUsers] = useState([])
	const [globalFilter, setGlobalFilter] = useState([])
	const [userToDelete, setUserToDelete] = useState(null)

	const dispatch = useDispatch()

	const userList = useSelector((state) => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userDelete = useSelector((state) => state.userDelete)
	const { success: successDelete } = userDelete

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			router.push('/login')
		}
	}, [dispatch, router, successDelete, userInfo])

	const deleteHandler = (id) => {
		dispatch(deleteUser(id))
		setUserToDelete(null)
	}

	/** Data table stuff */

	// header
	const header = (
		<>
			<input type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."></input>
			<Link href="/admin/user/create">
				<span className="btn btn-primary ml-1">
					<i className="fas fa-plus"></i> Crear Usuario
				</span>
			</Link>
		</>
	)

	// row options template
	const actionTemplate = (rowData) => {
		return (
			<div className="table-buttons">
				<button onClick={() => router.push(`/admin/user/${rowData._id}`)} className="btn-icon btn-caution">
					<i className="far fa-edit"></i>
				</button>
				{rowData.type !== 'admin' && (
					<button onClick={() => setUserToDelete(rowData)} className="btn-icon btn-danger">
						<i className="far fa-trash-alt"></i>
					</button>
				)}
			</div>
		)
	}

	// td templates
	const idBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">ID</span>
				<span className="p-column-value text-break">{rowData._id}</span>
			</div>
		)
	}

	const nameBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Nombre</span>
				<span className="p-column-value">{rowData.name}</span>
			</div>
		)
	}

	const emailBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Email</span>
				<span className="p-column-value">{rowData.email}</span>
			</div>
		)
	}

	const adminBodyTemplate = (rowData) => {
		return (
			<div className="td-custom">
				<span className="p-column-title">Administrador</span>
				<span className="p-column-value">
					{rowData.isAdmin ? (
						<i className="fas fa-check" style={{ color: 'green' }}></i>
					) : (
						<i className="fas fa-times" style={{ color: 'red' }}></i>
					)}
				</span>
			</div>
		)
	}

	const htmlHeader = () => <HtmlHeader title={`${APP_NAME} | Usuarios`} />

	return (
		<>
			{htmlHeader()}
			<Dialog
				header="User Deletion"
				visible={userToDelete}
				footer={
					<div className="horizontal">
						<button onClick={() => deleteHandler(userToDelete._id)} className="btn btn-primary">
							Eliminar
						</button>
						<button onClick={() => setUserToDelete(null)} className="btn btn-danger">
							Cancelar
						</button>
					</div>
				}
				onHide={() => setUserToDelete(null)}
			>
				<p>
					Eliminar <strong>{userToDelete && userToDelete.name}</strong>?
				</p>
			</Dialog>
			{loading ? (
				<Loader absolute={true} />
			) : error ? (
				<Error />
			) : (
				<div className="datatable">
					<div className="datatable-top">
						<h3>
							<i className="fas fa-user-friends"></i> Usuarios
						</h3>
					</div>
					<DataTable
						className="p-datatable-responsive-demo"
						value={users}
						selection={selectedUsers}
						onSelectionChange={(e) => setSelectedUsers(e.value)}
						paginator
						rows={10}
						rowsPerPageOptions={[5, 10, 25]}
						paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
						globalFilter={globalFilter}
						header={header}
					>
						{/**<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
						<Column field="_id" header="ID" body={idBodyTemplate} sortable></Column>
						<Column field="name" header="Nombre" body={nameBodyTemplate} sortable></Column>
						<Column field="email" header="Email" body={emailBodyTemplate} sortable></Column>
						<Column field="isAdmin" header="Administrador" body={adminBodyTemplate} sortable></Column>
						<Column body={actionTemplate}></Column>
					</DataTable>
				</div>
			)}
		</>
	)
}

export default UserListScreen
