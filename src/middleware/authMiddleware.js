const jwt = require('jsonwebtoken')
require('dotenv').config()

//chỉ admin mới đc làm gì đó (xóa user...)
const authMiddleware = (req, res, next) => {
    // console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    // console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        //nếu isAdmin true thì có thể xóa, còn false thì sẽ vào err
        if(err) {
            console.log('error:', err.name)
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        const { payload } = user
        if(payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR 2'
            })
        }
    });
}

const authUserMiddleware = (req, res, next) => {
    // console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    // console.log(token)
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        //nếu isAdmin true thì có thể xóa, còn false thì sẽ vào err
        if(err) {
            console.log('error:', err.name)
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        const { payload } = user
        if(payload?.isAdmin || payload?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR 2'
            })
        }
    });
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}