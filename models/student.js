const db = require("../db");

// Create a model from the schema
const Student = db.model("Student", {
   name: {type: String, required: true },  
   email: { type: String, required: true },
   password:{type: String, required: true },     
   reg_courses: [ String ]   
});

module.exports = Student;