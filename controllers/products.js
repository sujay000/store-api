const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    const products = await Product.find(req.query)
    res.status(200).json({ products })
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
