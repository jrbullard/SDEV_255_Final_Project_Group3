
addEventListener("DOMContentLoaded", async function() {    
    getAllCourses();        
 });

 let  errorMessage = document.querySelector("#errorMessage");
 let  courseDetail =document.querySelector("#courseDetail");
async function showDetail(courseId){
   const response = await fetch("/courses/" + courseId);
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
       courseDetail.innerHTML = html;
       errorMessage.innerHTML = '';
   }
}

async function removeDetail(courseId){
    var result = confirm("Delete the Course?");
    if (result == true) {
        await removeCourseFromInstructor(courseId);
        //await deleteCourse();
    }
 }
 async function removeCourseFromInstructor(courseId) { 
    const response = await fetch("/instructorsRemoveCourse/" + courseId, {
       method: "DELETE"
    }); 
    if (response.ok) {
         getAllCourses();
    }
    else {
        errorMessage.innerHTML = "Delete course failed.";
    } 
 }
 async function deleteCourse(courseId) { 
    const response = await fetch("/courses/" + courseId, {
       method: "DELETE"
    }); 
    if (response.ok) {
         getAllCourses();
    }
    else {
        errorMessage.innerHTML = "Delete course failed.";
    } 
 }
 // Load all courses 
 async function getAllCourses() {
    let insCourses = [];
    const insresponse = await fetch('/instructorsGetOne');
    if (insresponse.ok) {
        const instructor = await insresponse.json();
        insCourses = instructor.create_courses;
    }
    const response = await fetch("/courses");
    if (response.ok) {
      const courses = await response.json();
      let html = "<table>";
      for (let course of courses) {
         html += `<tr>
         <td>${course.name}</td>
         <td>${course.section}</td>
         <td>${course.title}</td>
         <td>${course.instructor}</td>
         <td><button onclick="showDetail('${course._id}')">View Detail</button></td>`;
         if (insCourses.includes(course._id)){
            html += `<td><button onclick="removeDetail('${course._id}')">Remove</button></td>`;
         }
         html += `<tr>`; 
      }
      html += `</table>`
      document.querySelector("#courselist").innerHTML = html;
   }
 }