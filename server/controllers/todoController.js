const Todo = require('../models/todo');
const User = require('../models/user');

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
            todosPerPage,
            user: req.user.userDB
        });
    } catch (err) {
        console.log(err.messages)
    }
};

exports.addNewTodo_post = async (req, res) => {
   
    try {
        const todo = req.body.todo;
        if (!todo) {
            req.flash("warning_msg", "You must add a todo!")
            res.redirect("back")
        }
        const newTodo = await new Todo({todo}).save()
        if (newTodo) return res.redirect('back'); 

    } catch (err) {
        
        console.log(err.message);
    }
};

exports.doneOrNotTodo_get = async (req, res) => {
    
    try {
        const todoId = req.params.id
        await Todo.findById(todoId).exec()
        .then((result) => {
            result.done = !result.done;
            return result.save();
        })
        .then((result) => {
            res.redirect("back")
        })
    } catch (err) {
        console.log(err.message)
        res.redirect("/todo");
    }
}

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
            todosPerPage,
            user: req.user.userDB
        });
    } catch (err) {
        console.log(err.message)
        res.redirect("/todo")
    }
}

exports.updateTodo_post = async (req, res) => {

    const sorted = +req.query.sorted || 1;
    const pages = +req.query.page || 1;

    try {
        await Todo.updateOne({_id: req.params.id}, {todo: req.body.todo}, { runValidators: true })
        res.redirect(`/todo/?page=${pages}&&sorted=${sorted}`)
    } catch (err) {
        console.log(err.message)
        req.flash("warning_msg", "You must change the todo first!")
        res.redirect("back")
    }
}

exports.deleteTodo_get = async (req, res) => {
    try {
        await Todo.deleteOne({_id: req.params.id})
        res.redirect("/todo");
    } catch (err) {
        console.log(err.message);
        res.redirect("/todo");
    }
}