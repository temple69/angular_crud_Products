const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true, default: '' },
    imgUrl: { type: String, required: true, default: '' },




})
module.exports = mongoose.model('Products', productSchema)