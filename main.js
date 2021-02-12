const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const connectDatabase = require("./server/database/connection");

const app = express();

require("dotenv").config();

// *** Log request ***
app.use(morgan("tiny"));

// MongoDB Connection
connectDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });