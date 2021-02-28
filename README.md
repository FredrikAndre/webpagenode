# Webpage with functional todo-list & register/login/ mail-based reset password

### Node_modules excluded in the gitrepo. Please see following list for programs used in this project: 
- Nodemon
- EJS
- bcrypt
- crypto
- dotenv
- express
- jsonwebtoken
- mongoose
- morgan (not necessary)
- nodemailer

*Of course all Mongo_DB is not included, please use your own connections for the database*

##### Simple Brief:

Create a register/login form for a user, to be able to go into and use a todolist. 
The user should be able to register a username, useremail and password. Name and email should be unique to one specific user.

User should also be able to reset his/her password using email-based server, which works fine. Added some light styling to the email to see how it works. 

Everything works like the brief stated. You can register, login and reset password. Also logout of course from todo. 
Also added if you are already logged in, you can not log in as another user. 

What can be better next time: Changing so user only can se his own database. I did this in another project but not with pagination. 
Also using authorisation with 3 party, like google and facebook. 

Enjoy!