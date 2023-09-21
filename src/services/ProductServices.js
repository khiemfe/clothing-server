const Product = require('../models/ProductModel')
// const bcrypt = require('bcrypt');
// const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

 const createProduct = (newProduct) => {
   return new Promise( async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, age, bmi } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null) {
                resolve({
                    status: "ERR",
                    message: 'The name of product is already'
                })
            }
            else {
                const createProduct = await Product.create({
                    name, 
                    image, 
                    type, 
                    price, 
                    age,
                    bmi,
                    // countInStock, 
                    // rating, 
                    // description
                })
                if(createProduct) {
                    resolve({
                        status: "OK",
                        message: 'SUCCESS',
                        data: createProduct
                    })
                }
            }
        } catch(e) {
            resolve({
                status: "ERROR service",
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
                     status: "ERR",
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
                    status: "ERR",
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
                     status: "ERR",
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

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise( async (resolve, reject) => {
         try {
            const totalProduct = await Product.count()

            if(filter && filter.length == 2) {
                const label = filter[0]
                const allProductFilter = await Product.find({
                    [label]: { '$regex': filter[1] }
                }).limit(limit).skip(page * limit)
                resolve({
                    status: "OK",
                    message: 'SUCCESS',
                    data: allProductFilter,
                    totalProduct: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if(sort && sort.length == 2) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: "OK",
                    message: 'SUCCESS',
                    data: allProductSort,
                    totalProduct: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: "OK",
                message: 'SUCCESS',
                data: allProduct,
                totalProduct: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit)
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