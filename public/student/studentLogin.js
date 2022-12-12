   const form = document.querySelector('form');
   const emailError = document.querySelector('.email.error');
   const passwordError = document.querySelector('.password.error');
   form.addEventListener('submit',async (e)=>{
       e.preventDefault();
       
       emailError.textContent = '';
       passwordError.textContent = '';

       const  email = form.email.value;
       const  password = form.password.value;
       const  role = form.role.value;
       try{
           const res = await fetch('/student/login',{
               method:'POST',
               body: JSON.stringify({email, password, role}),
               headers:{ 'Content-Type': 'application/json'}
           });
           console.log(res);
           const data = await res.json();
           console.log(data);
           if(data.errors){
               emailError.textContent = data.errors.email;
               passwordError.textContent = data.errors.password;
           }
           if(data.user){
               location.assign('/student/index');
           }
       }
       catch(err){
           console.log(err);
       }
   })