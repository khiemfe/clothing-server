const jwt = require('jsonwebtoken')
require('dotenv').config()

const genneralAccessToken = (payload) => {
    // console.log('pay', payload)
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

    return access_token
}

const genneralRefreshToken = (payload) => {
    // console.log('pay', payload)
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
           console.log(token)
           jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err) {
                    resolve({
                        status: "ERR",
                        message: "The authemtication"
                    })
                }
                const { payload } = user
                const access_token = await genneralAccessToken({
                     _id: payload?.id,
                     isAdmin: payload?.isAdmin
                })
                console.log('access_token', access_token)
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