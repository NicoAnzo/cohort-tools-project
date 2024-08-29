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
        next(error);
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
        next(error);
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
        next(error);
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
        next(error);
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
        next(error);
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
      next(error);
    });
  });
  
  
module.exports = router;