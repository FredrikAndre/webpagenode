const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./server/routes/userRouter");
const todoRouter = require("./server/routes/todoRouter");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
const connectDatabase = require("./server/database/connection");
require("dotenv").config();

const app = express();

// Log request
app.use(morgan("tiny"));

// MongoDB Connection
connectDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.set("view engine", "ejs");

// Express session
app.use(session ({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

// Connect-flash
app.use(flash());
// Global variables for use with flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.warning_msg = req.flash("warning_msg")
  next();
})

// Routes
app.use(userRouter);
app.use(todoRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });