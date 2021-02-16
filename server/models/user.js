const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cryptoUrl: String,
  cryptoUrlExpiration: Date,
  todoList: // New
  [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Todo"
  }]
});

userSchema.methods.addToList = function(todoItemId) { // New
  // Pushar in i shoppingCart
  this.todoList.push(todoItemId)
  // Filtrera data så att användare inte ska kunna lägga till samma course två gånger
  this.save();

}

const User = mongoose.model('user', userSchema);
module.exports = User;