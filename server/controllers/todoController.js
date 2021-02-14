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
};

exports.addNewTodo_post = async (req, res) => {
   
    try {
        const todo = req.body.todo;
        const newTodo = await new Todo({todo}).save()
        
        if (newTodo) return res.redirect('back'); 

    } catch (err) {
        console.log(err);
    }
};

exports.editTodo_get = async (req, res) => {

    try {
        const sorted = +req.query.sorted || 1;
        const pages = +req.query.page || 1;

        const totalData = await Todo.find().countDocuments();

        const todosPerPage = 3;
        
        const totalDataPart = Math.ceil(totalData/todosPerPage);

        const todoToShow = todosPerPage * pages;

        const todo = await Todo.find({}).limit(todoToShow).sort({date: sorted})
        res.render("editTodo.ejs", 
        {
            todo:todo, 
            idTask: req.params.id,
            pages,
            sorted,
            totalData,
            totalDataPart,
            todoToShow,
            todosPerPage
        });
    } catch (err) {
        console.log(err)
        res.redirect("/todo/todoHome")
    }
}

exports.deleteTodo_get = async (req, res) => {
    try {
        await Todo.deleteOne({_id: req.params.id})
        console.log("Deleted todo successfully")
        res.redirect("/todo/todoHome");
    } catch (err) {
        console.log(err);
        res.redirect("/todo/todoHome");
    }
}