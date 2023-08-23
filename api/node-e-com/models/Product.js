const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {

        tittle: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        category: {
            type: Array,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        price: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
