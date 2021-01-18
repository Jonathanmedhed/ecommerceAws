import { createRef } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import Header from '../components/Header'
import ImgText from '../components/sections/ImgText'
import IconCards from '../components/sections/IconCards'
import TextImg from '../components/sections/TextImg'
import ImgTextIcons from '../components/sections/ImgTextIcons'
import CarouselImgs from '../components/sections/CarouselImgs'
import TextOnly from '../components/sections/TextOnly'
import PriceSection from '../components/sections/PriceSection'
import TextGif from '../components/sections/TextGif'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { APP_NAME } from '../config'
import Head from 'next/head'

const Index = () => {
	let infoRef = createRef()
	let priceRef = createRef()
	let contactRef = createRef()

	const goTo = (option) => {
		switch (option) {
			case 'prices':
				priceRef.current.scrollIntoView({ behavior: 'smooth' })
				break
			case 'info':
				infoRef.current.scrollIntoView({ behavior: 'smooth' })
				break
			case 'contact':
				contactRef.current.scrollIntoView({ behavior: 'smooth' })
				break
			default:
				break
		}
	}

	const head = () => (
		<Head>
			<title>{APP_NAME} | Páginas Web</title>
			<meta name="description" content={'Creamos todo tipo de páginas web para su negocio'} />
			<link rel="canonical" href={`https://heddrichitsoluciones.online/`} />
			<meta property="og:title" content={`${APP_NAME} | Páginas Web`} />
			<meta property="og:description" content={'Creamos todo tipo de páginas web para su negocio'} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`https://heddrichitsoluciones.online/`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={``} />
			<meta property="og:image:secure_url" ccontent={`../static/images/phone.png`} />
			<meta property="og:image:type" content="image/png" />
			{/**<meta property="fb:app_id" content={`${FB_APP_ID}`} />*/}
		</Head>
	)

	return (
		<>
			{head()}
			<Provider store={store}>
				<Header goTo={goTo} />
				<body className="body">
					<IconCards infoRef={infoRef} />
					<CarouselImgs />
					<TextImg />
					<ImgTextIcons />
					<ImgText />
					<TextOnly />
					<PriceSection priceRef={priceRef} />
					<TextGif />
					<Contact contactRef={contactRef} />
				</body>
				<Footer />
			</Provider>
		</>
	)
}

export default Index
