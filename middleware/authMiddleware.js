const Student =  require('../models/student');
const Instructor =  require('../models/instructor');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'school project authication group3', (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/');
    }
}

const checkUser =  (req,res,next) => {
    const token = req.cookies.jwt;
    console.log("ABCD");
    if(token){
        jwt.verify(token, 'school project authication group3', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                res.locals.role = null;
                next();
            }else{
                console.log(decodedToken);
                console.log(decodedToken.role);
                //let user = await User.findById(decodedToken.id);
                if(decodedToken.role == 'instructor'){
                    let user = await Instructor.findById(decodedToken.id);
                    res.locals.user = user;
                    res.locals.role = 'instructor';
                }else{
                    let user = await Student.findById(decodedToken.id);
                    res.locals.user = user;
                    res.locals.role = 'student';
                }
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        res.locals.role = null;
        next();
    }
}

module.exports = { requireAuth, checkUser};