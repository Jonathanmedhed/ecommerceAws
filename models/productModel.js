import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
				required: true,
			},
		],
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		specs: [
			{
				type: String,
			},
		],
		discount: {
			type: Number,
		},
		deal: {
			amount: {
				type: Number,
			},
			discount: {
				type: Number,
			},
			qtyFree: {
				type: Number,
			},
		},
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
		shippingCost: {
			type: Number,
		},
		unitShippingCost: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
)

const Product = mongoose.model('Product', productSchema)

export default Product