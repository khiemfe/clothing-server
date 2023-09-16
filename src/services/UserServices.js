const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

 const createUser = (newUser) => {
   return new Promise( async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null) {
                resolve({
                    status: "OK",
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password.toString(), 10);
            const createUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword,
                phone
            })
            if(createUser) {
                resolve({
                    status: "OK",
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch(e) {
            reject(e)
        }
   })
}

const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
         const { name, email, password, confirmPassword, phone } = userLogin
         try {
             const checkUser = await User.findOne({
                 email: email
             })
             if(checkUser === null) {
                 resolve({
                     status: "OK",
                     message: 'The user is not defined'
                 })
             }
             console.log(typeof password.toString())
             console.log(typeof checkUser.password)
            console.log(password.toString() === checkUser.password)
            const comparePassword = bcrypt.compare(password.toString(), checkUser.password);
            console.log(comparePassword)
            if(!comparePassword) {
                resolve({
                    status: "OK",
                    message: 'The password or user in incorrect'
                })
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            // console.log(access_token)

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
         } catch(e) {
             reject(e)
         }
    })
}


const updateUser = (id, data) => {
    return new Promise( async (resolve, reject) => {
         try {
             const checkUser = await User.findOne({
                _id: id
             })
            //  console.log('checkUser', checkUser)
             if(checkUser === null) {
                 resolve({
                     status: "OK",
                     message: 'The user is not defined'
                 })
             }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            // console.log('updateUser', updateUser)

            resolve({
                status: "OK",
                message: 'SUCCESS',
                updateUser
            })
         } catch(e) {
             reject(e)
         }
    })
}

const deleteUser = (id) => {
    return new Promise( async (resolve, reject) => {
         try {
             const checkUser = await User.findOne({
                _id: id
             })
            //  console.log('checkUser', checkUser)
             if(checkUser === null) {
                 resolve({
                     status: "OK",
                     message: 'The user is not defined'
                 })
             }

             await User.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: 'DELETE USER SUCCESS',
            })
         } catch(e) {
             reject(e)
         }
    })
}

const getAllUser = () => {
    return new Promise( async (resolve, reject) => {
         try {
            const allUser = await User.find()

            resolve({
                status: "OK",
                message: 'SUCCESS',
                data: allUser
            })
         } catch(e) {
             reject(e)
         }
    })
}

const getDetailsUser = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await User.findOne({
               _id: id
            })
            if(user === null) {
                resolve({
                    status: "OK",
                    message: 'The user is not defined'
                })
            }
            resolve({
               status: "OK",
               message: 'SUCCESS',
               data: user
           })
        } catch(e) {
            reject(e)
        }
   })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
}