addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#deleteBtn").addEventListener("click", deleteCourse);
    getAllCourses();
 });
 
 // Load all courses into the drop-down list
 async function getAllCourses() {
    const response = await fetch("/courses");
    if (response.ok) {
       const courses = await response.json();
       let html = "";
       for (let course of courses) {
          html += `<option value="${course._id}">${course.name}</option>`; 
       }
 
       document.querySelector("#courseDropDown").innerHTML = html;
    }
 }
 
 async function deleteCourse() {
    // Get the course ID of the selected course
    const courseId = document.querySelector("#courseDropDown option:checked").value;
 
    const response = await fetch("/courses/" + courseId, {
       method: "DELETE"
    });
 
    if (response.ok) {
         // Successfully deleted course
         getAllCourses();
    }
    else {
       document.querySelector("#error").innerHTML = "Cannot delete course.";
    } 
 }