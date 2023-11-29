const express = require("express");
const router = express.Router();
const OTPControllers = require("../controllers/OTPControllers");

router.post("/create-otp", OTPControllers.createOTP);
router.delete("/delete-otp/:email", OTPControllers.deleteOTP);

module.exports = router;
