const { query } = require('express')
const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query
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

    //sort
    if (sort) {
        let sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        // just sort by time it was created
        result = result.sort('createdAt')
    }

    //select
    if (fields) {
        let fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const noOfskips = (page - 1) * limit

    result = result.skip(noOfskips).limit(limit)
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
