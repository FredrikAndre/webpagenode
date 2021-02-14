const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./server/routes/userRouter");
const morgan = require("morgan");
const connectDatabase = require("./server/database/connection");
require("dotenv").config();

const app = express();

// Log request
app.use(morgan("tiny"));

// MongoDB Connection
connectDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

// Routes
app.use(userRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });