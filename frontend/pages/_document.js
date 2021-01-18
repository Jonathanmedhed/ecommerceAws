import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {
	setGoogleTags() {
		if (publicRuntimeConfig.PRODUCTION) {
			return {
				__html: `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
			  
				gtag('config', 'G-HTRF2DDYX5');
        `,
			}
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
						integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
						crossorigin="anonymous"
					/>
					<link rel="stylesheet" href="/static/css/styles.css" />
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-HTRF2DDYX5"></script>
					<script dangerouslySetInnerHTML={this.setGoogleTags()} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
export default MyDocument
