
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema - describes and enforces the structure of the documents
const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String
});


// The model() method defines a model and creates a collection in MongoDB
// The collection name will default to the lowercased, plural form of the model name: "User" --> "users"
const User = mongoose.model("User", userSchema);

module.exports = User;