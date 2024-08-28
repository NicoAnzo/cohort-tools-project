const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const PORT = 5005;

const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json");
const students = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5005'],
  })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// COHORT ROUTES

app.get("/api/cohorts", (req, res) => {

  Cohort.find()
    .then((cohortArr) => {
      res.json(cohortArr);
    })
    .catch((error) => {
      console.log("Error trying to get the list of cohorts", error);
      res.status(500).json({error: "Failed"})
    });

});

/////////////////////

app.get("/api/cohorts/:cohortId", (req, res) => {

  const { cohortId } = req.params;

  Cohort.findOne({_id: cohortId})
    .then((cohortFromDB) => {
      res.json(cohortFromDB)
    })
    .catch((error) => {
      console.log("Error trying to get the specified cohort", error);
      res.status(500).json({error: "Failed"})
    });

});

//////////////////////

app.post("/api/cohorts", (req, res) => {

  const cohortDetails = req.body;

  Cohort.create(cohortDetails)
    .then((cohortFromDB) => {
      res.status(201).json(cohortFromDB)
    })
    .catch((error) => {
      console.log("Error trying to create a new cohort", error);
      res.status(500).json({error: "Failed"})
    });
});

//////////////////////

app.put("/api/cohorts/:cohortId", (req, res) => {

  const { cohortId } = req.params;
  const newCohortDetails = req.body;

  Cohort.findOneAndUpdate({_id: cohortId}, newCohortDetails, {new: true})
    .then((cohortFromDB) => {
      res.json(cohortFromDB)
    })
    .catch((error) => {
      console.log("Error trying to update a cohort", error);
      res.status(500).json({error: "Failed"})
    });
});

//////////////////////

app.delete("/api/cohorts/:cohortId", (req, res) => {

  const { cohortId } = req.params;

  Cohort.deleteOne({_id: cohortId})
    .then((response) => {
      res.json(response)
    })
    .catch((error) => {
      console.log("Error trying to delete a cohort", error);
      res.status(500).json({error: "Failed"})
    });
});


// STUDENT ROUTES

app.get("/api/students", (req, res) => {

  Student.find()
    .populate("cohort")
    .then((studentArr) => {
      res.json(studentArr);
    })
    .catch((error) => {
      console.log("Error trying to get the list of students", error);
      res.status(500).json({error: "Failed"})
    });
});

app.get("/api/students/cohort/:cohortId", (req, res) => {

  const { cohortId } = req.params;

  Student.find({cohort: cohortId})
    .populate("cohort")
    .then((studentArr) => {
      res.json(studentArr)
    })
    .catch((error) => {
      console.log("Error trying to get the list of students from the specified cohort", error);
      res.status(500).json({error: "Failed"})
    });
});

//////////////////

app.get("/api/students/:studentId", (req, res) => {

  const { studentId } = req.params;

  Student.findOne({_id: studentId})
    .populate("cohort")
    .then((studentFromDB) => {
      res.json(studentFromDB)
    })
    .catch((error) => {
      console.log("Error trying to get the specified student", error);
      res.status(500).json({error: "Failed"})
    });
});

///////////////////

app.post("/api/students", (req, res) => {

  const newStudent = req.body;

  Student.create(newStudent)
    .then((studentFromDB) => {
      res.status(201).json(studentFromDB)
    })
    .catch((error) => {
      console.log("Error trying to create a new student", error);
      res.status(500).json({error: "Failed"})
    });
});

//////////////////////

app.put("/api/students/:studentId", (req, res) => {

  const { studentId } = req.params;
  const newStudentDetails = req.body;

  Student.findOneAndUpdate({_id: studentId}, newStudentDetails, {new: true})
    .then((studentFromDB) => {
      res.json(studentFromDB)
    })
    .catch((error) => {
      console.log("Error trying to update a student", error);
      res.status(500).json({error: "Failed"})
    });
});

//////////////////////

app.delete("/api/students/:studentId", (req, res) => {

  const { studentId } = req.params;

  Student.deleteOne({_id: studentId})
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log("Error trying to delete a student", error);
    res.status(500).json({error: "Failed"})
  });
});



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});