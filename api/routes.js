const Course = require("../models/course");
const Student = require("../models/student");
const Instructor = require("../models/instructor");

const router = require("express").Router();

const express = require("express");

/*  Route  */
router.get("/teacherIndex", (req, res) => {
  res.render("teacherIndex");
});
router.get("/studentIndex", (req, res) => {
  res.render("studentIndex");
});
router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/coursePage", (req, res) => {
  res.render("coursePage");
});
router.get("/loginPage", (req, res) => {
  res.render("loginPage");
});

router.get("/addCourses", (req, res) => {
  res.render("addCourses");
});

router.get("/updateCourse", (req, res) => {
  res.render("updateCourse");
});

router.get("/removeCourses", (req, res) => {
  res.render("removeCourses");
});

/* Courses */
// Get list of all courses in the database
router.get("/courses", function (req, res) {
  Course.find(function (err, courses) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(courses);
      //console.log(courses);
    }
  });
});

router.get("/courses/:id", function (req, res) {
  // Use the ID in the URL path to find the course
  Course.findById(req.params.id, function (err, course) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(course);
    }
  });
});

router.post("/courses", function (req, res) {
  // Add a new course to the database
  const course = new Course(req.body);
  course.save(function (err, course) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(course);
      console.log(course._id);
    }
  });
});

router.put("/courses", function (req, res) {
  // Course to update sent in body of request
  const course = req.body;
  // Replace existing course fields with updated course
  Course.updateOne({ _id: course._id }, course, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else if (result.n === 0) {
      res.sendStatus(404);
    } else {
      res.status(204).json(course);
    }
  });
});

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

router.get("/instructors/courses/:id", function (req, res) {
  // Use the ID to find the instructor's courses
  Instructor.findById(req.params.id, function (err, instructor) {
    if (err) {
      res.status(400).send(err);
    } else {
      Course.find(function (err, courses) {
        if (err) {
          res.status(400).send(err);
        } else {
          let filteredCourses = courses.filter((item) =>
            instructor.create_courses.includes(item._id)
          );
          res.json(filteredCourses);
        }
      });
    }
  });
});

module.exports = router;
