const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// Login/Logout actions
router.post("/pre_authentication", authController.pre_authentication);
router.post("/authentication", authController.authentication);

module.exports = router;
