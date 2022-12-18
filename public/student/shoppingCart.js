addEventListener("DOMContentLoaded", async function() {
    await getAllCourses();
 });
 let  courseDetail =document.querySelector("#courseDetail");

async function removeDetail(courseId){
   var result = confirm("Remove the Course?");
   if (result == true) {
       await removeCourseFromStudent(courseId);
       await getAllCourses();
   }
}

async function removeCourseFromStudent(courseId) { 
    const response = await fetch("/studentRemoveCourse/" + courseId, {
      method: "DELETE"
    }); 
    if (response.ok) {
    }
    else {
      errorMessage.innerHTML = "Remove course failed.";
    }
    await getAllCourses(); 
 }

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
      // list enrolled courses
      console.log(stuCourses);
      console.log(stuCourses.length);
      
      if (stuCourses.length > 0){
        let stuhtml = "<h1>List of Enrolled courses</h1><hr/><table>";
        stuhtml += "<tr><td>Name</td><td>Dept_code</td><td>Title</td><td>Instructor</td><td>Credit hours</td><td>Open</td></tr>";
        for (let course of courses) {
          if (stuCourses.includes(course._id)){
             stuhtml += `<tr><td>${course.name}</td>
             <td>${course.dept_code}</td>
             <td>${course.title}</td>
             <td>${course.instructor}</td>
             <td>${course.credit_hrs}</td>
             <td>${course.is_open? 'Yes' : 'No'}</td>
             <td><button onclick="showDetail('${course._id}')">View</button></td>`;
             stuhtml += `<td><button onclick="removeDetail('${course._id}')">Remove</button></td>`;
          }
          stuhtml += `</tr>`; 
        }
        stuhtml += `</table>`;
        document.querySelector("#studentCourselist").innerHTML = stuhtml;
      }
      else {        
        document.querySelector("#studentCourselist").innerHTML ='<h3>You have no enrolled courses.</h3>';
        courseDetail.innerHTML = "";
      }      
    }
}