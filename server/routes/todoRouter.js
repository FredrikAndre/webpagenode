const express = require('express');
const Task = require('../models/todo');
const router = express.Router();

const todoController = require('../controllers/todoController');

const verifyUser = require("../middleware/verifyUser");

// Render startpage with Todo and add todos
router.get('/', verifyUser, todoController.renderTodoList_get);
router.post('/', verifyUser, todoController.addNewTodo_post);

// Showing done or not done todos
router.get('/complete/todo/:id', verifyUser, todoController.doneOrNotTodo_get);

// Edit todos and update them
router.get('/edit/todo/:id', verifyUser, todoController.editTodo_get);
router.post('/edit/todo/:id', verifyUser, todoController.updateTodo_post);

// Delete todos
router.get('/delete/todo/:id', verifyUser, todoController.deleteTodo_get);

module.exports = router;