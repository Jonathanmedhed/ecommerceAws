import GoogleLogin from 'react-google-login'
import { loginWithGoogle } from '../../actions/userActions'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_ID_LOCAL, PRODUCTION } from '../../config'
import { useDispatch } from 'react-redux'

const LoginGoogle = () => {
	const dispatch = useDispatch()

	const responseGoogle = (response) => {
		const tokenId = response.tokenId
		const user = { tokenId }

		dispatch(loginWithGoogle(user))
	}

	return (
		<div className="mt-half">
			<div>{PRODUCTION ? 'production' : 'development'}</div>
			<div>{GOOGLE_CLIENT_ID}</div>
			<div>{GOOGLE_CLIENT_ID_LOCAL}</div>
			{/**
			 * 
			<GoogleLogin
				clientId={`${PRODUCTION ? GOOGLE_CLIENT_ID : GOOGLE_CLIENT_ID_LOCAL}`}
				buttonText="Ingresa con Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				theme="dark"
			/>
			 */}
		</div>
	)
}

export default LoginGoogle
