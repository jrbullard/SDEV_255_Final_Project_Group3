    const form = document.querySelector('form');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    form.addEventListener('submit', async (e)=>{
        e.preventDefault();

        emailError.textContent = '';
        passwordError.textContent = '';

        const  fName = form.fName.value;
        const  lName = form.lName.value;
        const  email = form.email.value;
        const  password = form.password.value;
        const  role = form.role.value;
        try{
            const res = await fetch('/instructor/signup',{
                method:'POST',
                body: JSON.stringify({fName,lName, email, password,role}),
                headers:{ 'Content-Type': 'application/json'}
            });
            console.log(res);
            const data = await res.json();
            console.log("Instructor after Signed up",data);
            if(data.errors){
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            }
            if(data.user){
                location.assign('/instructor/index');
            }
        }
        catch(err){
            console.log(err);
        }
    });