const express = require('express')
const router = express.Router()
const ProductControllers = require('../controllers/ProductControllers')
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware')

router.post('/create', ProductControllers.createProduct)
router.put('/update/:id', authMiddleware, ProductControllers.updateProduct)
router.get('/get-details/:id', ProductControllers.getdetailsProduct)
router.delete('/delete/:id', authMiddleware, ProductControllers.deleteProduct)
router.get('/get-all', ProductControllers.getAllProduct)

// const ageModel = require("./model.pkl");
// router.get("/predict", (req, res) => {
//     // const image = 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-1/371341934_1017596916061476_1744781031918063451_n.jpg?stp=dst-jpg_p240x240&_nc_cat=102&ccb=1-7&_nc_sid=fe8171&_nc_ohc=-mrDR1KkSyMAX8mRzlU&_nc_ht=scontent.fdad3-5.fna&oh=00_AfB-j3C-zxfVayslre_k3MCqsSreJGe0fOgpSNt6igU7eA&oe=65151596';
  
//     const prediction = 20;
  
//     res.send( {ageModel} );
//   });

module.exports = router

