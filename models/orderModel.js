const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		guest: {
			name: { type: String },
			email: { type: String },
			phone: { type: String },
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				images: [{ type: String, required: true }],
				price: { type: Number, required: true },
				discountAmount: { type: Number },
				discountAmountQty: { type: Number },
				discountDealAmount: { type: Number },
				discountDealAmountQty: { type: Number },
				freeAmount: { type: Number },
				freeAmountQty: { type: Number },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String },
			city: { type: String },
			postalCode: { type: String },
			country: { type: String },
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentReference: {
			type: String,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		change: {
			type: Number,
			default: 0.0,
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPriceBs: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalDiscount: {
			type: Number,
		},
		isApproved: {
			type: Boolean,
			required: true,
			default: false,
		},
		approvedAt: {
			type: Date,
		},
		pickupAt: {
			type: Date,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isSetAside: {
			type: Boolean,
			required: true,
			default: false,
		},
		setAsideAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
		isCanceled: {
			type: Boolean,
			required: true,
			default: false,
		},
		canceledAt: {
			type: Date,
		},
		canceledReason: {
			type: String,
		},
		isChecked: {
			type: Boolean,
			required: true,
			default: false,
		},
		dollarValue: {
			type: Number,
		},
		buyer: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Order', orderSchema)
