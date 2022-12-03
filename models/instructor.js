const db = require("../db");

// Create a model from the schema
const Instructor = db.model("Instructor", {
   name: {type: String, required: true },  
   email: { type: String, required: true },
   password:{type: String, required: true },     
   create_courses: [ String ]   
});

module.exports = Instructor;