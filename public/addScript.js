addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#addBtn").addEventListener("click", addCourse);
    getAllCourses();
 });
 
async function addCourse() {
   const course = {
      courseName: document.querySelector("#courseName").value,
      courseSection: document.querySelector("#courseSection").value,
      courseTitle: document.querySelector("#courseTitle").value,
      instructor: document.querySelector("#instructor").value,
   };

   const response = await fetch("api/courses", {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(course)
   });

   if (response.ok){
      const results = await response.json();
      alert("Added course: " +  results._id);

      document.querySelector("form").reset();
   }
   
   else {
      document.querySelector("#error").innerHTML = "Cannot add course.";
   }
}