
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String
});


// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const User = mongoose.model("User", userSchema);

// EXPORT THE MODEL
module.exports = User;



