const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {

        userId: {
            type: String,
            required: true,
        },
        product: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        amount: {
            type: String,
        },
        address: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "pending"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
