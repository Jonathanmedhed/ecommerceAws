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

	return (
		<>
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
