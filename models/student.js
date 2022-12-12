const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

// Create a model from the schema
const stuSchema = new mongoose.Schema({
   fName: {type: String, required: [true, 'Please enter First Name'], },  
   lName: {type: String, required: [true, 'Please enter Last Name'], },  
   email: {type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase:true,
      validate: [isEmail, 'Please enter a valid email']
   },
   password:{type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters']
    },
   reg_courses: [ String ]   
});


stuSchema.post('save', function(doc,next){
   console.log('new student was created & saved', doc);
   next();
});

//before doc to database
stuSchema.pre('save', async function(next){
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

stuSchema.statics.login = async function(email, password){
   const user = await this.findOne({email});
   if(user){
       const auth = await bcrypt.compare(password, user.password);
       if(auth){
           return user;
       }
       throw Error('Incorrect password');
   }
   throw Error('Incorrect email');
}
const Student = mongoose.model('Student', stuSchema)
module.exports = Student;
//module.exports = mongoose.models.Student || mongoose.model('Student', stuSchema);