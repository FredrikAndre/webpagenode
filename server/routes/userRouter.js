const express = require('express');
const router = express.Router();

// Import functions
const homeController = require("../controllers/homeController");

router.get("/", homeController.showStart);

module.exports = router;