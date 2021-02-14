const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

const verifyUser = require("../middleware/verifyUser");

router.get('/todo/todoHome', verifyUser, todoController.renderTodoList_get);

module.exports = router;