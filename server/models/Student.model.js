
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    projects: [String],
    cohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cohort"
    }
});

// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;



