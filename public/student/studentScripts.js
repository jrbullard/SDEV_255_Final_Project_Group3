
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

async function enrollDetail(courseId){
   var result = confirm("Enroll the Course?");
   if (result == true) {
       await enrollCourse(courseId);
   }
}
async function enrollCourse(courseId) { 
   //Rnroll course from list
}

async function removeDetail(courseId){
    var result = confirm("Delete the Course?");
    if (result == true) {
        await removeCourseFromStudent(courseId);
    }
 }
 async function removeCourseFromStudent(courseId) { 
    //remove course from student list
 }

 // Load all courses 
 async function getAllCourses() {
   let stuCourses = [];
   const sturesponse = await fetch('/studentGetOne');
   if (sturesponse.ok) {
       const student = await sturesponse.json();
       stuCourses = student.reg_courses;
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
        if (!stuCourses.includes(course._id)){
         html += `<td><button onclick="enrollDetail('${course._id}')">Enroll</button></td>`;
        }
        if (stuCourses.includes(course._id)){
           html += `<td><button onclick="removeDetail('${course._id}')">UnRegister</button></td>`;
        }
        html += `<tr>`; 
     }
     html += `</table>`;
     document.querySelector("#courselist").innerHTML = html;
  }
 }