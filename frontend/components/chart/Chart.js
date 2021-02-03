import React, { Fragment, useState } from 'react'
import moment from 'moment'
// Components
import { Chart } from 'primereact/chart'
import { SelectButton } from 'primereact/selectbutton'
import { productInOrder, productsInOrder } from '../../utilities/utilities'

const ChartComp = ({ data, onlychart, type, title, productId, showQty }) => {
	// Open Lightbox
	const [openChart, setOpenChart] = useState(false)
	// Select Buttons
	const [value, setValue] = useState('day')
	const options = [
		{ label: 'Hoy', value: 'day' },
		{ label: 'Semana', value: 'week' },
		{ label: 'Mes', value: 'month' },
		{ label: 'Año', value: 'year' },
	]

	let today = new Date()

	// return data to be added to date
	const dataToAdd = (item) => {
		return type === 'transactions' && !showQty
			? item.totalPrice
			: type === 'transactions' && showQty
			? productsInOrder(item.orderItems)
			: type === 'product' && !showQty
			? productInOrder(productId, item.orderItems).amount
			: type === 'product' && showQty && productInOrder(productId, item.orderItems).qty
	}

	/**
	Monthly Data
	*/
	const yearSales = (items) => {
		let January = 0
		let February = 0
		let March = 0
		let April = 0
		let May = 0
		let June = 0
		let July = 0
		let August = 0
		let September = 0
		let October = 0
		let November = 0
		let December = 0

		items &&
			items.forEach((item) => {
				let date = new Date((type === 'transactions' || type === 'product') && item.paidAt)
				// Only This year's
				if (date.getFullYear() === today.getFullYear()) {
					switch (date.getMonth()) {
						case 0:
							January = January + dataToAdd(item)
							break
						case 1:
							February = February + dataToAdd(item)
							break
						case 2:
							March = March + dataToAdd(item)
							break
						case 3:
							April = April + dataToAdd(item)
							break
						case 4:
							May = May + dataToAdd(item)
							break
						case 5:
							June = June + dataToAdd(item)
							break
						case 6:
							July = July + dataToAdd(item)
							break
						case 7:
							August = August + dataToAdd(item)
							break
						case 8:
							September = September + dataToAdd(item)
							break
						case 9:
							October = October + dataToAdd(item)
							break
						case 10:
							November = November + dataToAdd(item)
							break
						case 11:
							December = December + dataToAdd(item)
							break
						default:
						// code block
					}
				}
			})

		return {
			/** Label for each month */
			labels: [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Deciembre',
			],
			/** Asign value for each month */
			/** Chart Style */
			datasets: [
				{
					label: title && title,
					data: [
						January,
						February,
						March,
						April,
						May,
						June,
						July,
						August,
						September,
						October,
						November,
						December,
					],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		}
	}

	/**
	Current month Data
	*/
	const monthlySales = (items) => {
		let d1 = 0
		let d2 = 0
		let d3 = 0
		let d4 = 0
		let d5 = 0
		let d6 = 0
		let d7 = 0
		let d8 = 0
		let d9 = 0
		let d10 = 0
		let d11 = 0
		let d12 = 0
		let d13 = 0
		let d14 = 0
		let d15 = 0
		let d16 = 0
		let d17 = 0
		let d18 = 0
		let d19 = 0
		let d20 = 0
		let d21 = 0
		let d22 = 0
		let d23 = 0
		let d24 = 0
		let d25 = 0
		let d26 = 0
		let d27 = 0
		let d28 = 0
		let d29 = 0
		let d30 = 0
		let d31 = 0

		items &&
			items.forEach((item) => {
				let date = new Date(item.paidAt)
				// Only this year and month's
				if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
					switch (date.getDate()) {
						case 1:
							d1 = d1 + dataToAdd(item)
							break
						case 2:
							d2 = d2 + dataToAdd(item)
							break
						case 3:
							d3 = d3 + dataToAdd(item)
							break
						case 4:
							d4 = d4 + dataToAdd(item)
							break
						case 5:
							d5 = d5 + dataToAdd(item)
							break
						case 6:
							d6 = d6 + dataToAdd(item)
							break
						case 7:
							d7 = d7 + dataToAdd(item)
							break
						case 8:
							d8 = d8 + dataToAdd(item)
							break
						case 9:
							d9 = d9 + dataToAdd(item)
							break
						case 10:
							d10 = d10 + dataToAdd(item)
							break
						case 11:
							d11 = d11 + dataToAdd(item)
							break
						case 12:
							d12 = d12 + dataToAdd(item)
							break
						case 13:
							d13 = d13 + dataToAdd(item)
							break
						case 14:
							d14 = d14 + dataToAdd(item)
							break
						case 15:
							d15 = d15 + dataToAdd(item)
							break
						case 16:
							d16 = d16 + dataToAdd(item)
							break
						case 17:
							d17 = d17 + dataToAdd(item)
							break
						case 18:
							d18 = d18 + dataToAdd(item)
							break
						case 19:
							d19 = d19 + dataToAdd(item)
							break
						case 20:
							d20 = d20 + dataToAdd(item)
							break
						case 21:
							d21 = d21 + dataToAdd(item)
							break
						case 22:
							d22 = d22 + dataToAdd(item)
							break
						case 23:
							d23 = d23 + dataToAdd(item)
							break
						case 24:
							d24 = d24 + dataToAdd(item)
							break
						case 25:
							d25 = d25 + dataToAdd(item)
							break
						case 26:
							d26 = d26 + dataToAdd(item)
							break
						case 27:
							d27 = d27 + dataToAdd(item)
							break
						case 28:
							d28 = d28 + dataToAdd(item)
							break
						case 29:
							d29 = d29 + dataToAdd(item)
							break
						case 30:
							d30 = d30 + dataToAdd(item)
							break
						case 31:
							d31 = d31 + dataToAdd(item)
							break
						default:
						// code block
					}
				}
			})

		return {
			/** Label for each day */
			labels: [
				' 1',
				' 2',
				' 3',
				' 4',
				' 5',
				' 6',
				' 7',
				' 8',
				' 9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
				'24',
				'25',
				'26',
				'27',
				'28',
				'29',
				'30',
				'31',
			],
			datasets: [
				/** Asign value for each month */
				/** Chart Style */
				{
					label: title && title,
					data: [
						d1,
						d2,
						d3,
						d4,
						d5,
						d6,
						d7,
						d8,
						d9,
						d10,
						d11,
						d12,
						d13,
						d14,
						d15,
						d16,
						d17,
						d18,
						d19,
						d20,
						d21,
						d22,
						d23,
						d24,
						d25,
						d26,
						d27,
						d28,
						d29,
						d30,
						d31,
					],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		}
	}

	/**
	Current week Data
	*/
	const weeklySales = (items) => {
		let monday = 0
		let tuesday = 0
		let wednesday = 0
		let thursday = 0
		let friday = 0
		let saturday = 0
		let sunday = 0

		let startOfWeek = moment().startOf('week').toDate()
		let endOfWeek = moment().endOf('week').toDate()

		items &&
			items.forEach((item) => {
				let date = new Date(item.paidAt)
				if (date > startOfWeek && date < endOfWeek) {
					switch (date.getDay()) {
						case 0:
							sunday = sunday + dataToAdd(item)
							break
						case 1:
							monday = monday + dataToAdd(item)
							break
						case 2:
							tuesday = tuesday + dataToAdd(item)
							break
						case 3:
							wednesday = wednesday + dataToAdd(item)
							break
						case 4:
							thursday = thursday + dataToAdd(item)
							break
						case 5:
							friday = friday + dataToAdd(item)
							break
						case 6:
							saturday = saturday + dataToAdd(item)
							break
						default:
						// code block
					}
				}
			})

		return {
			/** Label for each day of the week*/
			labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			/** Asign value for each day of the week */
			/** Chart Style */
			datasets: [
				{
					label: title && title,
					data: [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		}
	}

	/**
	Today Data
	*/
	const daySales = (items) => {
		let h0 = 0
		let h1 = 0
		let h2 = 0
		let h3 = 0
		let h4 = 0
		let h5 = 0
		let h6 = 0
		let h7 = 0
		let h8 = 0
		let h9 = 0
		let h10 = 0
		let h11 = 0
		let h12 = 0
		let h13 = 0
		let h14 = 0
		let h15 = 0
		let h16 = 0
		let h17 = 0
		let h18 = 0
		let h19 = 0
		let h20 = 0
		let h21 = 0
		let h22 = 0
		let h23 = 0

		items &&
			items.forEach((item) => {
				let date = new Date(item.paidAt)
				// Only this year and month's
				if (
					date.getFullYear() === today.getFullYear() &&
					date.getMonth() === today.getMonth() &&
					date.getDate() === today.getDate()
				) {
					switch (date.getHours()) {
						case 0:
							h0 = h0 + dataToAdd(item)
							break
						case 1:
							h1 = h1 + dataToAdd(item)
							break
						case 2:
							h2 = h2 + dataToAdd(item)
							break
						case 3:
							h3 = h3 + dataToAdd(item)
							break
						case 4:
							h4 = h4 + dataToAdd(item)
							break
						case 5:
							h5 = h5 + dataToAdd(item)
							break
						case 6:
							h6 = h6 + dataToAdd(item)
							break
						case 7:
							h7 = h7 + dataToAdd(item)
							break
						case 8:
							h8 = h8 + dataToAdd(item)
							break
						case 9:
							h9 = h9 + dataToAdd(item)
							break
						case 10:
							h10 = h10 + dataToAdd(item)
							break
						case 11:
							h11 = h11 + dataToAdd(item)
							break
						case 12:
							h12 = h12 + dataToAdd(item)
							break
						case 13:
							h13 = h13 + dataToAdd(item)
							break
						case 14:
							h14 = h14 + dataToAdd(item)
							break
						case 15:
							h15 = h15 + dataToAdd(item)
							break
						case 16:
							h16 = h16 + dataToAdd(item)
							break
						case 17:
							h17 = h17 + dataToAdd(item)
							break
						case 18:
							h18 = h18 + dataToAdd(item)
							break
						case 19:
							h19 = h19 + dataToAdd(item)
							break
						case 20:
							h20 = h20 + dataToAdd(item)
							break
						case 21:
							h21 = h21 + dataToAdd(item)
							break
						case 22:
							h22 = h22 + dataToAdd(item)
							break
						case 23:
							h23 = h23 + dataToAdd(item)
							break
						default:
						// code block
					}
				}
			})

		return {
			/** Label for each hour of the day*/
			labels: [
				' 0',
				' 1',
				' 2',
				' 3',
				' 4',
				' 5',
				' 6',
				' 7',
				' 8',
				' 9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
			],
			datasets: [
				{
					/** Asign value for each hour */
					/** Chart Style */
					label: title && title,
					data: [
						h0,
						h1,
						h2,
						h3,
						h4,
						h5,
						h6,
						h7,
						h8,
						h9,
						h10,
						h11,
						h12,
						h13,
						h14,
						h15,
						h16,
						h17,
						h18,
						h19,
						h20,
						h21,
						h22,
						h23,
					],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		}
	}

	const lightBox = () => (
		<>
			{openChart && (
				<div className="light-box">
					<div className="inner">
						<i onClick={() => setOpenChart(false)} class="far fa-times-circle"></i>
						<div className="bg-white p-1">
							<div className={onlychart === true ? 'chart-wrapper-center' : 'chart-wrapper'}>
								<div className="chart-container">
									<Fragment>
										{value === 'day' && <Chart type="line" data={daySales(data)} />}
										{value === 'week' && <Chart type="line" data={weeklySales(data)} />}
										{value === 'month' && <Chart type="line" data={monthlySales(data)} />}
										{value === 'year' && <Chart type="line" data={yearSales(data)} />}
									</Fragment>
								</div>
								<div className="select-buttons">
									<SelectButton value={value} options={options} onChange={(e) => setValue(e.value)} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)

	const chart = () => (
		<div className={onlychart === true ? 'chart-wrapper-center' : 'chart-wrapper'}>
			<div className="chart-container">
				<Fragment>
					{value === 'day' && <Chart type="line" data={daySales(data)} />}
					{value === 'week' && <Chart type="line" data={weeklySales(data)} />}
					{value === 'month' && <Chart type="line" data={monthlySales(data)} />}
					{value === 'year' && <Chart type="line" data={yearSales(data)} />}
				</Fragment>
			</div>
			<div className="select-buttons">
				<SelectButton value={value} options={options} onChange={(e) => e.value && setValue(e.value)} />
			</div>
			{/** Toggle chart lightbox */}
			<div className="show-sm">
				<i onClick={() => setOpenChart(true)} className="far fa-window-maximize"></i>
			</div>
		</div>
	)

	return (
		<Fragment>
			{/** Lightbox view */}
			{lightBox()}
			{/** Main chart */}
			{chart()}
		</Fragment>
	)
}

export default ChartComp
