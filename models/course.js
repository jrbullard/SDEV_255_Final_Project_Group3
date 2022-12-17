const mongoose = require("mongoose");

// Create a model from the schema
const courseSchema  =new mongoose.Schema({
   name: {type: String, required: [true, 'Please enter Course Name'],  },
   dept_code: String,
   title: { type: String, required: [true, 'Please enter Course Title'] },
   section:{type: String, required: [true, 'Please enter Course Section'] },
   credit_hrs: { type: Number, min: 1, max: 5 },
   instructor: {type: String, required: true },   
   is_open: { type: Boolean, default: true },
   is_deleted:{ type: Boolean, default: false },
   created_on: { type: Date, default: Date.now },
   edit_on: { type: Date, default: Date.now } 
});


courseSchema.statics.getById = async function(_id){
   const course = await this.findOne({_id});
   if(course){
      return course;
   }
   throw Error('No course');
}

const Course= mongoose.model('Course', courseSchema)
module.exports = Course;