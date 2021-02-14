const express = require('express');
const router = express.Router();

// Import functions
const homeController = require("../controllers/homeController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");

// Start page with paths to register / login
router.get("/welcome", homeController.showWelcome);

// Register
router.get('/user/register', registerController.register_get);
router.post('/user/register', registerController.register_post);

router.get('/user/login', loginController.login_get);
router.post('/user/login', loginController.login_post);

module.exports = router;