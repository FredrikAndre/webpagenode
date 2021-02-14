const express = require('express');
const Task = require('../models/todo');
const router = express.Router();

const todoController = require('../controllers/todoController');

const verifyUser = require("../middleware/verifyUser");

// Render startpage with Todo and add todos
router.get('/todo/todoHome', todoController.renderTodoList_get);
router.post('/todo/todoHome', todoController.addNewTodo_post);

// Edit todos and update them
router.get('/edit/todo/:id', todoController.editTodo_get);

// Delete todos
router.get('/delete/todo/:id', todoController.deleteTodo_get);

module.exports = router;