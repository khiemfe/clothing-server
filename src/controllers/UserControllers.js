const UserServices = require('../services/UserServices')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password || !confirmPassword ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserServices.createUser(req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserServices.loginUser(req.body)
        console.log('rrrresponse', response)
        const {refresh_token, ...newRespone} = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true, //chỉ lấy được cookie bằng http thôi, ko lấy được bằng js
            secure: false, // bảo mật phía client 
            samSite: 'strict',
            path: '/'
        })
        return res.status(200).json({...newRespone, refresh_token})
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout SUCCESS'
        })
    } catch(e) {
        return res.status(404).json({
            message: 'err logout'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        
        console.log('userId:', userId)
        console.log('data:', data)
        const response = await UserServices.updateUser(userId, data)
        return res.status(200).json(response)

    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        // console.log('userId:', userId)
        // const token = req.headers
        // console.log('token:', token)

        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        
        const response = await UserServices.deleteUser(userId)
        return res.status(200).json(response)

    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteManyUser = async (req, res) => {
    try {
        const ids = req.body.ids
        if(!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await UserServices.deleteManyUser(ids)
        return res.status(200).json(response)

    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserServices.getAllUser()
        return res.status(200).json(response)

    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserServices.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: "ERR"
        })
    }
}

const refreshToken = async (req, res) => {
    console.log(1111111111111112222222222)
    console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
        const token = req.cookies.refresh_token
        // let token = req.headers.token.split(' ')[1]
        if(!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: 'errrrrr'
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteManyUser
}