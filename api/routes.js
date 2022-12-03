const Course = require("../models/course");
const router = require("express").Router();

const express = require("express");

// Get list of all courses in the database
router.get("/course", function(req, res) {    
    Course.find(function(err, course) {
        if (err) {
            res.status(400).send(err);
        } 
        else {
            res.json(course);
            //console.log(course);            
        }
    });
});

// Add a new course to the database
router.post("/course", function(req, res) {
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

module.exports = router;