addEventListener("DOMContentLoaded", async function() { 
   getAllCourses();        
 });
 let  errorMessage = document.querySelector("#errorMessage");
 let  courseDetail =document.querySelector("#courseDetail");
 let searchCtrl = document.querySelector("#search");


async function showDetail(courseId){
   const response = await fetch("/courses/" + courseId);
   if (response.ok) {
       const course = await response.json();
       let html = "<h1>Course Detail</h1><table>";
         html += `<tr><td>Name:</td><td>${course.name}</td></tr>
         <tr><td>Dept_Code:</td><td>${course.dept_code}</td></tr>
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
       await getAllCourses();
   }
}
async function enrollCourse(courseId) { 
   const response = await fetch("/studenEnrollCourse/", {
      method:"PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({courseID: courseId})
   }); 
   console.log(response.status);
   if (response.status == 204){
      return true;
   }
   else {
      console.log(response);
      document.querySelector(".studentCourse.error").innerHTML = "Enroll Course failed.";
   }
}

 // Load all courses 
 async function getAllCourses() {
   let stuCourses = [];
   const sturesponse = await fetch('/studentGetOne');
   if (sturesponse.ok) {
       const student = await sturesponse.json();
       stuCourses = student.reg_courses;
   }
   let searchValue = searchCtrl.value;

   const response = await fetch("/courses");
   if (response.ok) {
     const courses = await response.json();
     let html = "<table>";
     html += "<tr><td>Name</td><td>Dept_code</td><td>Title</td><td>Instructor</td><td>Credit hours</td></tr>";
     for (let course of courses) {
         if ( searchValue.trim() == '' || (searchValue.trim() != '' && course.dept_code == searchValue)){            
            html += `<tr>
            <td>${course.name}</td>
            <td>${course.dept_code}</td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td>${course.credit_hrs}</td>
            <td><button onclick="showDetail('${course._id}')">View</button></td>`;
        
            if (!stuCourses.includes(course._id)){
               html += `<td><button onclick="enrollDetail('${course._id}')">Enroll</button></td>`;
            }
            
            if (stuCourses.includes(course._id)){
               html += `<td><button onclick="window.location.href='/student/shoppingCart';">Check Cart</button></td>`;
               }

            html += `<tr>`; 
         }
     }
     html += `</table>`;
     document.querySelector("#courselist").innerHTML = html;
  }
 }