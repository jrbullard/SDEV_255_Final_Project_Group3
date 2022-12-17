const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Instructor = require("../models/instructor");

//handle errors
const handleErrors = (err) => {
  let errors = { email: "", passwrod: "" };

  // incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "that email is not registered";
  }
  // incorrect password
  if (err.message === "Incorrect password") {
    errors.password = err.message;
  }
  //duplicat error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  // validation errors
  if (err.message.includes("Instructor validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
  if (err.message.includes("Student validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({ id, role }, "school project authication group3", {
    expiresIn: maxAge,
  });
};
module.exports.stu_signup_get = (req, res) => {
  res.locals.role = "student";
  res.render("student/studentSignupPage");
};
module.exports.stu_login_get = (req, res) => {
  res.locals.role = "student";
  res.render("student/studentLoginPage");
};

module.exports.ins_signup_get = (req, res) => {
  res.locals.role = "instructor";
  res.render("instructor/instructorSignupPage");
};
module.exports.ins_login_get = (req, res) => {
  res.locals.role = "instructor";
  res.render("instructor/instructorLoginPage");
};

module.exports.signup_post = async (req, res) => {
  const { fName, lName, email, password, role } = req.body;
  try {
    if (role === "instructor") {
      console.log({ fName, lName, email, password });
      const user = await Instructor.create({ fName, lName, email, password });
      const token = createToken(user._id, role);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id, role: role });
    } else {
      const user = await Student.create({ fName, lName, email, password });
      const token = createToken(user._id, role);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id, role: role });
    }
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    if (role === "instructor") {
      res.status(400).json({ errors });
    } else {
      res.status(400).json({ errors });
    }
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (role === "instructor") {
      const user = await Instructor.login(email, password);
      const token = createToken(user._id, role);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id, role: role });
    } else {
      const user = await Student.login(email, password);
      const token = createToken(user._id, role);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id, role: role });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
