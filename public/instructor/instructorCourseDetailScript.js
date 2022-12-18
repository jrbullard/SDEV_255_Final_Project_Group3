addEventListener("DOMContentLoaded", async function() {    
    await this.showDetail(courseId);        
 });


let courseId = document.querySelector("#courseId").value;
let  courseDetail =document.querySelector("#courseDetail");
//console.log(courseId);  

async function showDetail(courseId){
   const response = await fetch("/courses/" + courseId);
   if (response.ok) {
       const course = await response.json();
       let html = "<table style='font-size:1.4em; padding-top:0px;'>";
         html += `<tr><td>Name:</td><td>${course.name}</td></tr>
         <tr><td>Dept_code:</td><td>${course.dept_code}</td></tr>
         <tr><td>Section:</td><td>${course.section}</td></tr>
         <tr><td>Title:</td><td>${course.title}</td></tr>
         <tr><td>Credit:</td><td>${course.credit_hrs}</td></tr>
         <tr><td>Instructor:</td><td>${course.instructor}</td><tr>
         <tr><td>IsOpen:</td><td>${course.is_open ? 'Yes' : 'No'}</td></tr>`; 
       html += "</table>"
       courseDetail.innerHTML = html;
   }
}
