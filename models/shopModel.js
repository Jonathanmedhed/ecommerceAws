import mongoose from 'mongoose'

const shopSchema = mongoose.Schema(
	{
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		postalCode: {
			type: String,
		},
		country: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		facebook: {
			type: String,
		},
		image: {
			type: String,
		},
		instagram: {
			type: String,
		},
		message: {
			type: String,
		},
		mobile: {
			type: String,
		},
		name: {
			type: String,
		},
		logo: {
			type: String,
		},
		phone: {
			type: String,
		},
		title: {
			type: String,
		},
		twitter: {
			type: String,
		},
		dollarValue: {
			type: Number,
		},
		taxPercentage: {
			type: Number,
		},
		includeTax: {
			type: Number,
		},
		waitTime: {
			type: Number,
		},
		waitTimeDelivery: {
			type: Number,
		},
		lat: {
			type: Number,
		},
		lng: {
			type: Number,
		},
		mobileBank: {
			type: String,
		},
		mobilePhone: {
			type: String,
		},
		mobileID: {
			type: String,
		},
		shipmentCost: {
			type: Number,
		},
		shipmentLimit: {
			type: Number,
		},
		openingTimes: [
			{
				rangeDays: {
					type: String,
				},
				rangeTimes: {
					type: String,
				},
			},
		],
		sections: [
			{
				title: {
					type: String,
				},
				text: {
					type: String,
				},
				img: {
					type: String,
				},
				type: {
					type: String,
				},
				position: {
					type: Number,
				},
			},
		],
		externalLink: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

const Shop = mongoose.model('Shop', shopSchema)

export default Shop
