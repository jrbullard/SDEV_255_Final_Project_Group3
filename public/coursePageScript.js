addEventListener("DOMContentLoaded", async function() {
    //document.querySelector("#deleteBtn").addEventListener("click", deleteCourse);
    getAllCourses();
    //document.querySelector("#deleteBtn").addEventListener("click", deleteCourse);
 });
 async function showDetail(courseId){
    const response = await fetch("/api/courses/" + courseId);
    if (response.ok) {
        const course = await response.json();
        let html = "<h1>Course Detail</h1><table>";
          html += `<tr><td>Name:</td><td>${course.name}</td></tr>
          <tr><td>Section:</td><td>${course.section}</td></tr>
          <tr><td>Title:</td><td>${course.title}</td></tr>
          <tr><td>Credit:</td><td>${course.credit_hrs}</td></tr>
          <tr><td>Instructor:</td><td>${course.instructor}</td><tr>
          <tr><td>IsOpen:</td><td>${course.is_open ? 'Yes' : 'No'}</td></tr>`; 
        html += "</table>"
        document.querySelector("#courseDetail").innerHTML = html;
    }
 }
 // Load all courses into the drop-down list
 async function getAllCourses() {
    const response = await fetch("/api/courses");
    if (response.ok) {
       const courses = await response.json();
       let html = "<table>";
       for (let course of courses) {
          html += `<tr>
          <td>${course.name}</td>
          <td>${course.section}</td>
          <td>${course.title}</td>
          <td>${course.instructor}</td>
          <td><button onclick="showDetail('${course._id}')">View Detail</button></td>
          <tr>`; 
       }

       document.querySelector("#courselist").innerHTML = html;
    }
 }