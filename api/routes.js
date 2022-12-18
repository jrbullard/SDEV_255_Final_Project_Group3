const { Router } = require('express');
const Course = require("../models/course");
const Student = require("../models/student");
const Instructor = require("../models/instructor");
const {requireAuth, checkUser} = require('../middleware/authMiddleware');


const router = Router();

const express = require("express");
const instructorController = require('../controllers/instructorController');
const studentController = require('../controllers/studentController');
const courseController = require('../controllers/courseController');

/*  Route  */
router.get("/", (req, res) => {
  if(res.locals.user){
    if(res.locals.role === 'instructor'){
      res.render("instructor/instructorIndex");
    } else if (res.locals.role === 'student') {
      res.render("student/studentIndex");
    }else {
      res.render("index");
    }
  }
  else {
    res.render("index");
  }
});
router.get("/instructor/index",requireAuth, (req, res) => {
  res.render("instructor/instructorIndex");
});

router.get("/instructor/courseDetail/:id",requireAuth, (req, res) => {
  res.render("instructor/instructorCourseDetail", {id : req.params.id});
  console.log({id : req.params.id});
});

router.get("/instructor/createCourse",requireAuth, (req, res) => {
  res.render("instructor/instructorCreateCourse");
});
router.get("/student/shoppingCart",requireAuth, (req, res) => {
  res.render("student/shoppingCart");
});

router.get("/student/index",requireAuth, (req, res) => {
  res.render("student/studentIndex");
});

router.get("/index", (req, res) => {
  res.render("index");
});

router.get("/instructor/updateCourse/:id",requireAuth, (req, res) => {
  res.render("instructor/instructorUpdateCourse", {id : req.params.id});
});

/* Courses */

// List all available courses from the school
router.get("/courses",requireAuth, courseController.getCourses);

// Get one course by course ID 
router.get("/courses/:id",requireAuth, courseController.getOneCourse);

// Create one course
router.post("/courses",requireAuth, courseController.createCourse);

// Update one course
router.put("/courses",requireAuth, courseController.updateCourse);

router.delete("/courses/:id", function (req, res) {
  // Delete a course by ID
  Course.deleteOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else if (result.n === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});

/* Student */
// Get list of all students in the database
router.get("/students", function (req, res) {
  Student.find(function (err, students) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(students);
      console.log(students);
    }
  });
});

router.get("/students/:id", function (req, res) {
  // Use the ID in the URL path to find the student
  Student.findById(req.params.id, function (err, student) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(student);
    }
  });
});

router.get("/students/courses/:id", function (req, res) {
  // Use the ID in the URL path to find the student's registed courses
  Student.findById(req.params.id, function (err, student) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(student.reg_courses);
    }
  });
});

/* Instructor */
// Get list of all instructors in the database
router.get("/instructors", function (req, res) {
  Instructor.find(function (err, instructors) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(instructors);
      //console.log(instructors);
    }
  });
});

router.get("/instructors/:id", function (req, res) {
  // Use the ID in the URL path to find the instructor
  Instructor.findById(req.params.id, function (err, instructor) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(instructor);
    }
  });
});

// retrieve one instructor by id
router.get('/instructorsGetOne',requireAuth, instructorController.get_Instructor);
// remove one course from instructor
router.delete('/instructorsRemoveCourse/:id',requireAuth, instructorController.remove_InstructorCourse);
// Add one course for instructor
router.post('/instructorsAddCourse',requireAuth, instructorController.add_InstructorCourse);

router.get('/studentGetOne',requireAuth, studentController.get_Student);
router.delete('/studentRemoveCourse/:id',requireAuth, studentController.remove_StudentCourse);
router.put('/studenEnrollCourse',requireAuth, studentController.enroll_StudentCourse);

module.exports = router;
