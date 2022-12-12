const jwt = require("jsonwebtoken");
const Instructor = require("../models/instructor");

module.exports.get_Instructor = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                let user = await Instructor.findById(decodedToken.id);
                res.json(user);
            }
        });
    }
    else{
        res.json(null);
    }
}

module.exports.add_InstructorCourse = async (req, res) => {
    const token = req.cookies.jwt;
    const courseID = req.body.courseID;
    if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                let user = await Instructor.findById(decodedToken.id);
                let filteredCourses = user.create_courses;
                filteredCourses = filteredCourses.filter(x => x !=courseID);
                user.create_courses = filteredCourses.push(courseID);
                Instructor.updateOne({ _id: user._id }, user, function (err, result) {
                    if (err) {
                        res.status(400).send(err);
                    } else if (result.n === 0) {
                        res.sendStatus(404);
                    } else {
                        res.status(204).json(user);
                    }
                });
            }
        });
    }
    else{
        res.json(null);
    }
}
module.exports.remove_InstructorCourse = async (req, res) => {
    const token = req.cookies.jwt;
    const courseID = req.params.id;
     if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                let user = await Instructor.findById(decodedToken.id);
                let filteredCourses = user.create_courses;
                user.create_courses = filteredCourses.filter(x => x !=courseID);
                Instructor.updateOne({ _id: user._id }, user, function (err, result) {
                    if (err) {
                        res.status(400).send(err);
                    } else if (result.n === 0) {
                        res.sendStatus(404);
                    } else {
                        res.status(204).json(user);
                    }
                });
            }
        });
    }
    else{
        res.json(null);
    }
}