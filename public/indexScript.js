addEventListener("DOMContentLoaded", async function() {
    //document.querySelector("#deleteBtn").addEventListener("click", deleteCourse);
    getAllCourses();
    //document.querySelector("#deleteBtn").addEventListener("click", deleteCourse);
 });
 
 // Load all courses into the drop-down list
 async function getAllCourses() {
    const response = await fetch("/api/courses");
    if (response.ok) {
       const courses = await response.json();
       let html = "<ol>";
       for (let course of courses) {
          html += `<li>${course.name}&nbsp &nbsp &nbsp &nbsp &nbsp${course.section} 
          &nbsp &nbsp &nbsp &nbsp &nbspTitle: ${course.title}&nbsp &nbsp &nbsp &nbsp &nbspInstructor: 
          ${course.instructor}</li>`; 
       }

       html += "</ol>"
 
       document.querySelector("#courselist").innerHTML = html;
    }
 }