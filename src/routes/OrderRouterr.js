const express = require("express");
const router = express.Router();
const OrderControllers = require("../controllers/OrderController");
const { authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/create", authUserMiddleware, OrderControllers.createOrder);

module.exports = router;
