const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'products route' })
}

const getAllProductsStatic = async (req, res) => {
    throw new Error('walla custom error dikh rah ')
    res.status(200).json({ msg: 'products testing route' })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}
