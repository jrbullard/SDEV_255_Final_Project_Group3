addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#addBtn").addEventListener("click", addCourse);
    getAllCourses();
 });

async function getAllCourses() {
   const response = await fetch("/courses");
   if (response.ok) {
      const courses = await response.json();
      let html = "<h1>Course List</h1><table>";
      for (let course of courses) {
         html += `<tr>
         <td>${course.name}</td>
         <td>${course.section}</td>
         <td>${course.title}</td>
         <td>${course.instructor}</td>
         <tr>`; 
      }
      document.querySelector("#courselist").innerHTML = html;
   }
}

async function addCourse() {
   const course = {
      name: document.querySelector("#courseName").value,
      dept_code:  document.querySelector("#courseDept").value,
      title: document.querySelector("#courseTitle").value,
      section: document.querySelector("#courseSection").value,
      credit_hrs: document.querySelector("#creditHr").value,
      instructor: document.querySelector("#instructor").value,
      is_open: document.querySelector("#courseStatus").value,
      created_on: new Date()
   };
   const response = await fetch("/courses", {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(course)
   });

   if (response.ok){
      const results = await response.json();
      alert("Added course: " +  results._id);
      document.querySelector("form").reset();
      getAllCourses();
   }
   
   else {
      console.log(response);
      document.querySelector("#error").innerHTML = "Cannot add course.";
   }
}