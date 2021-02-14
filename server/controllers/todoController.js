const Todo = require('../models/todo');

exports.renderTodoList_get = async (req, res) => {
    
    try {
        const sorted = +req.query.sorted || 1;
        const pages = +req.query.page || 1;

        const totalData = await Todo.find().countDocuments();

        const todosPerPage = 3;
        
        const totalDataPart = Math.ceil(totalData/todosPerPage);

        const todoToShow = todosPerPage * pages;

        const allTodo = await Todo.find().limit(todoToShow).sort({date: sorted});
        
        res.render('todoHome.ejs', 
        { 
            todo: allTodo,
            pages,
            sorted,
            totalData,
            totalDataPart,
            todoToShow,
            todosPerPage
        });
    } catch (err) {
        console.log(err)
    }
}