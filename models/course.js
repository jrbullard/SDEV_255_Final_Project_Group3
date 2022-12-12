const mongoose = require("mongoose");

// Create a model from the schema
const Course = mongoose.model("Course", {
   name: {type: String, required: true },
   dept_code: String,
   title: { type: String, required: true },
   section:{type: String, required: true },
   credit_hrs: { type: Number, min: 1, max: 5 },
   instructor: {type: String, required: true },   
   students: [ String ],
   is_open: { type: Boolean, default: true },
   is_deleted:{ type: Boolean, default: false },
   created_on: { type: Date, default: Date.now },
   edit_on: { type: Date, default: Date.now } 
});

module.exports = Course;