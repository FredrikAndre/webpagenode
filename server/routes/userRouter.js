const express = require('express');
const router = express.Router();

// Import functions
const homeController = require("../controllers/homeController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const resetController = require("../controllers/resetController");

const verifyUser = require("../middleware/verifyUser");

// Start page with paths to register / login
router.get('/welcome', homeController.showWelcome);

// Register
router.get('/user/register', registerController.register_get);
router.post('/user/register', registerController.register_post);

// Log in
router.get('/user/login', loginController.login_get);
router.post('/user/login', loginController.login_post);

// Send reset password email
router.get('/user/reset', resetController.reset_get);
router.post('/user/reset', resetController.reset_post);

// Reset password Form
router.get('/user/reset/:cryptoUrl', resetController.verifyCryptoUrl_get);
router.post('/user/resetPasswordForm', resetController.resetPasswordForm_post);

module.exports = router;