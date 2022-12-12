const jwt = require("jsonwebtoken");
const Student = require("../models/student");

module.exports.get_Student = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                let user = await Student.findById(decodedToken.id);
                res.json(user);
            }
        });
    }
    else{
        res.json(null);
    }
}

module.exports.enroll_StudentCourse = async (req, res) => {
    const token = req.cookies.jwt;
    const courseID = req.body.courseID;
    if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                let user = await Student.findById(decodedToken.id);
                let courses = user.reg_courses;
                courses = courses.filter(x => x !=courseID);
                user.reg_courses = courses.push(courseID);
                Student.updateOne({ _id: user._id }, user, function (err, result) {
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
module.exports.remove_StudentCourse = async (req, res) => {
    const token = req.cookies.jwt;
    const courseID = req.params.id;
     if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                res.json(null);
            }else{
                let user = await Student.findById(decodedToken.id);
                let courses = user.reg_courses;
                user.reg_courses = courses.filter(x => x !=courseID);
                Student.updateOne({ _id: user._id }, user, function (err, result) {
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