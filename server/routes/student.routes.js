const router = require("express").Router();

const Student = require("../models/Student.model");
const Cohort = require("../models/Cohort.model")


// STUDENT ROUTES

router.get("/api/students", (req, res) => {

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
  
///////////////////////
  
  router.get("/api/students/cohort/:cohortId", (req, res) => {
  
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
  
  router.get("/api/students/:studentId", (req, res) => {
  
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
  
  router.post("/api/students", (req, res) => {
  
    const newStudent = req.body;
  
    Student.create(newStudent)
      .then((newStudent) => {
        res.status(201).json(newStudent)
      })
      .catch((error) => {
        console.log("Error trying to create a new student", error);
        res.status(500).json({error: "Failed"})
      });
  });
  
//////////////////////
  
  router.put("/api/students/:studentId", (req, res) => {
  
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
  
  router.delete("/api/students/:studentId", (req, res) => {
  
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
  
  
module.exports = router;