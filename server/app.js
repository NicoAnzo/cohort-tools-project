
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require('./middleware/error.handling');

const cookieParser = require("cookie-parser");
const PORT = 5005;

const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// STATIC DATA
const cohorts = require("./cohorts.json");
const students = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173'],
  })
);

require('dotenv').config()

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// ROUTES - https://expressjs.com/en/starter/basic-routing.html

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const cohortRouter = require("./routes/cohort.routes");
app.use("/", cohortRouter);

const studentRouter = require("./routes/student.routes");
app.use("/", studentRouter);

const authRouter = require("./routes/auth.routes");   
app.use("/auth", authRouter);   

const userRouter = require("./routes/user.routes");
app.use("/", userRouter);


app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});