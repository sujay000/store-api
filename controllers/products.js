const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'products route' })
}

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        price: 25,
    })
    res.status(200).json({ products })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}
