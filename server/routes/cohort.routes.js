const router = require("express").Router();

const Cohort = require("../models/Cohort.model");

// COHORT ROUTES

router.get("/api/cohorts", (req, res) => {

    Cohort.find()
      .then((cohortArr) => {
        res.json(cohortArr);
      })
      .catch((error) => {
        next(error);
      });
  
  });
  
/////////////////////
  
  router.get("/api/cohorts/:cohortId", (req, res) => {
  
    const { cohortId } = req.params;
  
    Cohort.findOne({_id: cohortId})
      .then((cohortFromDB) => {
        res.json(cohortFromDB)
      })
      .catch((error) => {
        next(error);
      });
  
  });
  
//////////////////////
  
  router.post("/api/cohorts", (req, res) => {
  
    const cohortDetails = req.body;
  
    Cohort.create(cohortDetails)
      .then((cohortFromDB) => {
        res.status(201).json(cohortFromDB)
      })
      .catch((error) => {
        next(error);
      });
  });
  
//////////////////////
  
  router.put("/api/cohorts/:cohortId", (req, res) => {
  
    const { cohortId } = req.params;
    const newCohortDetails = req.body;
  
    Cohort.findOneAndUpdate({_id: cohortId}, newCohortDetails, {new: true})
      .then((cohortFromDB) => {
        res.json(cohortFromDB)
      })
      .catch((error) => {
        next(error);
      });
  });
  
//////////////////////
  
  router.delete("/api/cohorts/:cohortId", (req, res) => {
  
    const { cohortId } = req.params;
  
    Cohort.deleteOne({_id: cohortId})
      .then((response) => {
        res.json(response)
      })
      .catch((error) => {
        next(error);
      });
  });
  

  module.exports = router;