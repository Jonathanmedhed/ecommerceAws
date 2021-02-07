import Router from 'next/router'
import GoogleLogin from 'react-google-login'
import { loginWithGoogle } from '../../actions/userActions'
import { GOOGLE_CLIENT_ID } from '../../config'

const LoginGoogle = () => {
	const responseGoogle = (response) => {
		// console.log(response);
		const tokenId = response.tokenId
		const user = { tokenId }

		loginWithGoogle(user).then((data) => {
			if (data.error) {
				console.log(data.error)
			} else {
			}
		})
	}

	return (
		<div className="pb-3">
			<GoogleLogin
				clientId={`${GOOGLE_CLIENT_ID}`}
				buttonText="Login with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				theme="dark"
			/>
		</div>
	)
}

export default LoginGoogle
