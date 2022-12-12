addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#updateBtn").addEventListener("click", updateCourse);
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
         <td><button onclick="showDetail('${course._id}')">Edit</button></td>
         <tr>`; 
      }
      document.querySelector("#courselist").innerHTML = html;
   }
}

async function showDetail(courseId){
    const response = await fetch("/courses/" + courseId);
    if (response.ok) {
        const course = await response.json();
        document.querySelector("#courseId").value = courseId;
        document.querySelector("#courseName").value = course.name;
        document.querySelector("#courseDept").value = course.dept_code;
        document.querySelector("#courseTitle").value = course.title;
        document.querySelector("#courseSection").value = course.section;
        document.querySelector("#creditHr").value = course.credit_hrs;
        document.querySelector("#instructor").value = course.instructor;
        document.querySelector("#courseStatus").checked = course.is_open;
    }
 }
async function updateCourse() {
   const course = {
      _id: document.querySelector("#courseId").value,
      name: document.querySelector("#courseName").value,
      dept_code:  document.querySelector("#courseDept").value,
      title: document.querySelector("#courseTitle").value,
      section: document.querySelector("#courseSection").value,
      credit_hrs: document.querySelector("#creditHr").value,
      instructor: document.querySelector("#instructor").value,
      is_open: document.querySelector("#courseStatus").checked
   };
   const response = await fetch("/courses/", {
      method:"PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(course)
   });
   if (response.ok){
      alert("Update course success!");
      document.querySelector("form").reset();
      getAllCourses();
   }
   else {
      document.querySelector("#error").innerHTML = "Cannot update course.";
   }
}