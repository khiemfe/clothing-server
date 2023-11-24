const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const { authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/create/:id", authUserMiddleware, CartController.createCart);
router.get("/get-all-cart/:id", authUserMiddleware, CartController.getAllCart);
// router.get(
//   "/get-details-cart/:id",
//   authUserMiddleware,
//   CartController.getDetailsOrder
// );
router.delete(
  "/delete-cart/:id",
  authUserMiddleware,
  CartController.deleteCart
);

router.post(
  "/delete-many-cart",
  authUserMiddleware,
  CartController.deleteManyCart
);

module.exports = router;
