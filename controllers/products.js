const { query } = require('express')
const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    let result = Product.find(queryObject)
    if (sort) {
        let sortList = sort.split(',').join(' ')
        console.log(sortList)
        result = result.sort(sortList)
    } else {
        // just sort by time it was created
        result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
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
