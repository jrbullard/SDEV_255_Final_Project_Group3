const jwt = require("jsonwebtoken");
const Course = require("../models/course");

const handleErrors = (err) => {
    let errors = { courseName: "", courseTitle: "", courseSection: "", creditHr: "" };
  
    // incorrect email
    if (err.message === "Incorrect email") {
        errors.courseName = "that email is not registered";
    }
    // incorrect password
    if (err.message === "Incorrect password") {
        errors.courseTitle = err.message;
    }
    if (err.message === "Incorrect password") {
        errors.courseSection = err.message;
    }
    if (err.message === "Incorrect password") {
        errors.creditHr = err.message;
    }
    // validation errors
    if (err.message.includes("Course validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
      console.log('MYERROR', errors);
      return errors;
    }
    console.log('OUTMYERROR', errors);
    return errors;  
  };


module.exports.getCourses = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                Course.find(function (err, courses) {
                    if (err) {
                      res.status(400).send(err);
                    } else {
                        courses = courses.filter(x => !x.is_deleted);
                        res.json(courses);
                    }
                  });
            }
        });
    }
    else{
        res.json(null);
    }
}

module.exports.createCourse = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                const course = new Course(req.body);
                console.log(course);
                course.save(function (err, course) {
                  if (err) {
                    console.log(err)
                    res.status(400).send(err);
                  } else {
                    res.status(201).json(course);
                  }
                });
            }
        });
    }
    else{
        res.json(null);
    }
}
module.exports.updateCourse = async (req, res) => {
    const token = req.cookies.jwt;
     if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                const course = new Course(req.body);
                console.log("Course Body", course);
                let courseDB = await Course.findById(course._id);
                console.log("Course DB", courseDB);
                if(courseDB != null){
                    Course.updateOne({ _id: course._id }, course, function (err, result) {
                        if (err) {
                            res.status(400).send(err);
                        } else if (result.n === 0) {
                            res.sendStatus(404);
                        } else {
                            res.status(200).json(course);
                        }
                    });
                }
                else{
                    res.sendStatus(404);
                }
            }
        });
    }
    else{
        res.json(null);
    }
}
module.exports.removeCourse = async (req, res) => {
    const token = req.cookies.jwt;
    const courseID = req.params.id;
     if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                let courseDB = await course.findById(courseID);
                if(courseDB != null){
                    courseDB.is_deleted = true;
                    Course.updateOne({ _id: course._id }, course, function (err, result) {
                        if (err) {
                            res.status(400).send(err);
                        } else if (result.n === 0) {
                            res.sendStatus(404);
                        } else {
                            res.status(204).json(course);
                        }
                    });
                }
                else{
                    res.sendStatus(404);
                }
            }
        });
    }
    else{
        res.json(null);
    }
}
module.exports.getOneCourse  = async (req, res) => {
    Course.findById(req.params.id, function (err, course) {
        if (err) {
        res.status(400).send(err);
        } else {
        res.json(course);
        }
     });
}