const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/UserControllers')
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware')

router.post('/sign-up', UserControllers.createUser)
router.post('/sign-in', UserControllers.loginUser)
router.put('/update-user/:id', UserControllers.updateUser)
router.delete('/delete-user/:id', authMiddleware, UserControllers.deleteUser)
router.get('/get-all', authMiddleware, UserControllers.getAllUser)
router.get('/get-details/:id', authUserMiddleware, UserControllers.getDetailsUser)
router.post('/refresh-token', UserControllers.refreshToken) //access_token mới thay thế khi nó hết hạn

module.exports = router

