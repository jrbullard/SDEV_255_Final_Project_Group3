
addEventListener("DOMContentLoaded", async function() {    
    getAllCourses();        
 });

 let  errorMessage = document.querySelector("#errorMessage");
 let  courseDetail =document.querySelector("#courseDetail");
//Show one course
async function showDetail(courseId){
   const response = await fetch("/courses/" + courseId);
   if (response.ok) {
       const course = await response.json();
       let html = "<table style='font-size:1.4em; padding-top:0px;'>";
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
//Update Course
async function updateDetail(courseId){
   location.assign('/instructor/updateCourse/'+courseId);
}
//Remove course
async function removeDetail(courseId){
    var result = confirm("Delete the Course?");
    if (result == true) {
        await removeCourseFromInstructor(courseId);
        await deleteCourse(courseId);
        getAllCourses();
    }
 }
 async function removeCourseFromInstructor(courseId) { 
    const response = await fetch("/instructorsRemoveCourse/" + courseId, {
       method: "DELETE"
    }); 
    if (response.ok) {
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
    }
    else {
        errorMessage.innerHTML = "Delete course failed.";
    } 
 }
 // Load all courses 
 async function getAllCourses() {
    let insCourses = [];
    const insresponse = await fetch('/instructorsGetOne');  // get one teacher
    if (insresponse.ok) {
        const instructor = await insresponse.json();
        insCourses = instructor.create_courses;  // get a teacher-created courses
    }
    const response = await fetch("/courses");
    if (response.ok) {
      const courses = await response.json();
      let html = "<table><tr><td>Name</td><td>Section</td><td>Title</td><td>Instructor</td><td>Open</td><td></td><td></td><td></td></tr>";
      for (let course of courses) {
         html += `<tr>
         <td>${course.name}</td>
         <td>${course.section}</td>
         <td>${course.title}</td>
         <td>${course.instructor}</td>
         <td>${course.is_open? 'Yes' : 'No'}</td>
         <td><button onclick="showDetail('${course._id}')">View Detail</button></td>`;
         if (insCourses.includes(course._id)){
            html += `<td><button onclick="updateDetail('${course._id}')">Update</button></td>`;
            html += `<td><button onclick="removeDetail('${course._id}')">Remove</button></td>`;
         }
         html += `<tr>`; 
      }
      html += `</table>`
      document.querySelector("#courselist").innerHTML = html;
   }
 }