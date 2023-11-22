const express = require("express");
const router = express.Router();
const OrderControllers = require("../controllers/OrderController");
const { authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/create", authUserMiddleware, OrderControllers.createOrder);
router.get("/get-all-order-details/:id", authUserMiddleware, OrderControllers.getAllOrderDetails);

module.exports = router;
