const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

// Create a model from the schema
const instructorSchema = new mongoose.Schema({
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
   create_courses: [ String ]
});
instructorSchema.post('save', function(doc,next){
   console.log('new user was created & saved', doc);
   next();
});

//before doc to db
instructorSchema.pre('save', async function(next){
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
});


instructorSchema.statics.login = async function(email, password){
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

instructorSchema.statics.getById = async function(_id){
   const user = await this.findOne({_id});
   if(user){
      return user;
   }
   throw Error('No user');
}

const Instructor= mongoose.model('Instructor', instructorSchema)
module.exports = Instructor
//module.exports =  mongoose.models.Instructor || mongoose.model('Instructor', insSchema);