
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortsSchema = new Schema({
  cohortSlug: String,
  cohortName: String,
  program: String,
  format: String,
  campus: String,
  startDate: String,
  endDate: String,
  inProgress: Boolean,
  programManager: String,
  leadTeacher: String,
  totalHours: Number
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Cohort = mongoose.model("Cohort", cohortsSchema);

// EXPORT THE MODEL
module.exports = Cohort;



