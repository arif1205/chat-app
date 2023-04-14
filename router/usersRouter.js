// external imports
const express = require("express");
const userController = require("../controller/usersController");

const router = express.Router();

// users page
router.get("/", userController.getUsers);

module.exports = router;
