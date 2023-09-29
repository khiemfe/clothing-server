const jwt = require('jsonwebtoken')
require('dotenv').config()

const genneralAccessToken = async (payload) => {
    // console.log('pay', payload)
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' })

    return access_token
}

const genneralRefreshToken = async (payload) => {
    // console.log('pay', payload)
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
           console.log('///////////',token)
        //    const fs = require('fs')
        //     const base64ToImage = require('base64-to-image')

            // fs.readFile('../Clothing_Store/src/components/base64.txt', (err, data) => {
            //     const base64Data = data.toString()
            //     // console.log(base64Data)
            //     base64ToImage(base64Data, 'my_images/')
            // })
           jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err) {
                    resolve({
                        status: "ERR",
                        message: "The authemticationnn"
                    })
                }
                console.log('??????????', user)
                const access_token = await genneralAccessToken({
                     id: user?.id,
                     isAdmin: user?.isAdmin
                })
                console.log('access_token ---------------', access_token)
                 resolve({
                    status: "OK",
                    message: 'SUCCESS',
                    access_token
                })
           })

        } catch(e) {
            reject(e)
        }
   })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}