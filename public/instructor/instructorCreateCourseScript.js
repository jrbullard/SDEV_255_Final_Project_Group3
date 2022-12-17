const form = document.querySelector('form');
const courseNameError = document.querySelector('.courseName.error');
const courseSectionError = document.querySelector('.courseSection.error');
const courseTitleError = document.querySelector('.courseTitle.error');
const creditHrError = document.querySelector('.creditHr.error');
const InstructorCtl = document.querySelector('#instructor');


form.addEventListener('submit', async (e)=>{
   e.preventDefault();
   this.addInstructorCourse();
});
this.FillInstructor();

async function FillInstructor(){
   const insresponse = await fetch("/instructorsGetOne");
   if (insresponse.ok) {
      const instructor = await insresponse.json();
      console.log(instructor);
      let name = instructor.lName + ', ' + instructor.fName;
      InstructorCtl.value = name;
  }   
}

async function addInstructorCourse(){
   var result = confirm("Add the Course?");
   if (result == true) {
      try
      {
         courseId = await addCourse();
         let updateRes = await attachCourseToInstructor(courseId);
         alert("Add Course success, return to list page.");
         location.assign('/instructor/index');
      }
      catch(err){
         document.querySelector(".addcourse.error").innerHTML = "Add Course failed.";
      }
   }
}

async function addCourse() {
   courseNameError.textContent = '';
   courseSectionError.textContent = '';
   courseTitleError.textContent = '';
   creditHrError.textContent = '';

   const course = {
      name: form.courseName.value,
      dept_code:  form.courseDept.value,
      title: form.courseTitle.value,
      section: form.courseSection.value,
      credit_hrs: form.creditHr.value,
      instructor: form.instructor.value,
      is_open: form.courseStatus.checked,
      created_on: new Date()
   };
   const res = await fetch('/courses',{
      method:'POST',
      body: JSON.stringify(course),
      headers:{ 'Content-Type': 'application/json'}
   });
   console.log('AAA', res);
   const data = await res.json();
   console.log("Created Course", data);
   if(data.errors){
   courseNameError.textContent = data.errors.courseName;
   courseSectionError.textContent = data.errors.courseSection;
   courseTitleError.textContent = data.errors.courseTitle;
   creditHrError.textContent = data.errors.creditHr;
   }
   if(data){
   let courseId = data._id;
   return courseId;
   }
}

async function attachCourseToInstructor(courseId) {
   const response = await fetch("/instructorsAddCourse/", {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({courseID: courseId})
   }); 
   console.log(response.status);
   if (response.status == 204){
      return true;
   }
   else {
      console.log(response);
      document.querySelector(".addcourse.error").innerHTML = "add Course failed.";
   }
}