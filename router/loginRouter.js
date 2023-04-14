// external imports
const express = require("express");
const loginController = require("../controller/loginController");

const router = express.Router();

// login page
router.get("/", loginController.getLogin);

module.exports = router;
