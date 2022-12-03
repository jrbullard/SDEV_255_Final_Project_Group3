const Course = require("../models/course");
const Student = require("../models/student");
const Instructor = require("../models/instructor");

const router = require("express").Router();

const express = require("express");

/*  Route  */
router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/coursePage', (req, res) => {
    res.render('coursePage');
});

router.get('/addCourses', (req, res) => {
    res.render('addCourses');
});

router.get('/removeCourses', (req, res) => {
    res.render('removeCourses');
});

/* Courses */
// Get list of all courses in the database
router.get("/courses", function(req, res) {    
    Course.find(function(err, courses) {
        if (err) {
            res.status(400).send(err);
        } 
        else {
            res.json(courses);
            //console.log(courses);            
        }
    });
});

// Add a new course to the database
router.post("/courses", function(req, res) {
   const course = new Course(req.body);
   course.save(function(err, course) {
      if (err) {
         res.status(400).send(err);
      } 
      else {
         res.status(201).json(course);
      }
   });
});

/* Student */
// Get list of all students in the database
router.get("/students", function(req, res) {    
    Student.find(function(err, students) {
        if (err) {
            res.status(400).send(err);
        } 
        else {
            res.json(students);
            console.log(students);            
        }
    });
});

/* Instructor */
// Get list of all instructors in the database
router.get("/instructors", function(req, res) {    
    Instructor.find(function(err, instructors) {
        if (err) {
            res.status(400).send(err);
        } 
        else {
            res.json(instructors);
            console.log(instructors);            
        }
    });
});

module.exports = router;