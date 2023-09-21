const ProductServices = require('../services/ProductServices')
const JwtService = require('../services/JwtService')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, age, bmi } = req.body
        console.log('ppppppppppppppppp',req.body)
        if(!name || !image || !type || !price || !age || !bmi) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is requireddd'
            })
        } 
        const response = await ProductServices.createProduct(req.body)
        console.log('ggggggggggggggg', response)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductServices.updateProduct(productId, data)
        return res.status(200).json(response)

    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getdetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductServices.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: "ERR"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id

        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductServices.deleteProduct(productId)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductServices.getAllProduct(+(limit) || 8, +(page) || 0, sort, filter)
        return res.status(200).json(response)

    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getdetailsProduct,
    deleteProduct,
    getAllProduct
}