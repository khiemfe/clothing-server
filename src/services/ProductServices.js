const Product = require('../models/ProductModel')
// const bcrypt = require('bcrypt');
// const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

 const createProduct = (newProduct) => {
   return new Promise( async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: 'The name of product is already'
                })
            }
            const createProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock, 
                rating, 
                description
            })
            if(createProduct) {
                resolve({
                    status: "OK",
                    message: 'SUCCESS',
                    data: createProduct
                })
            }
        } catch(e) {
            resolve({
                status: "ERROR",
            })
            reject(e)
        }
   })
}

const updateProduct = (id, data) => {
    return new Promise( async (resolve, reject) => {
         try {
             const checkProduct = await Product.findOne({
                _id: id
             })
            //  console.log('checkProduct', checkProduct)
             if(checkProduct === null) {
                 resolve({
                     status: "OK",
                     message: 'The product is not defined'
                 })
             }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: "OK",
                message: 'SUCCESS',
                updateProduct
            })
         } catch(e) {
             reject(e)
         }
    })
}

const getDetailsProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const product = await Product.findOne({
               _id: id
            })
            if(product === null) {
                resolve({
                    status: "OK",
                    message: 'The product is not defined'
                })
            }
            resolve({
               status: "OK",
               message: 'SUCCESS',
               data: product
           })
        } catch(e) {
            reject(e)
        }
   })
}

const deleteProduct = (id) => {
    return new Promise( async (resolve, reject) => {
         try {
             const checkProduct = await Product.findOne({
                _id: id
             })
             if(checkProduct === null) {
                 resolve({
                     status: "OK",
                     message: 'The user is not defined'
                 })
             }
            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: 'DELETE PRODUCT SUCCESS',
            })
         } catch(e) {
             reject(e)
         }
    })
}

const getAllProduct = () => {
    return new Promise( async (resolve, reject) => {
         try {
            const allProduct = await Product.find()
            resolve({
                status: "OK",
                message: 'SUCCESS',
                data: allProduct
            })
         } catch(e) {
             reject(e)
         }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}