
const express = require('express')
const router = express.Router()
const ProductControllers = require('../controllers/ProductControllers')
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware')

router.post('/create', ProductControllers.createProduct)
router.put('/update/:id', authMiddleware, ProductControllers.updateProduct)
router.get('/get-details/:id', ProductControllers.getdetailsProduct)
router.delete('/delete/:id', authMiddleware, ProductControllers.deleteProduct)
router.get('/get-all', ProductControllers.getAllProduct)
router.post('/delete-many', authMiddleware, ProductControllers.deleteManyProduct)

module.exports = router

