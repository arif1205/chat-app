// external imports
const express = require("express");
const inboxController = require("../controller/inboxController");

const router = express.Router();

// login page
router.get("/", inboxController.getInbox);

module.exports = router;
