const express = require("express");

const mongoose = require('mongoose');
const authRoutes = require('./api/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');


const app = express();

app.set('view engine', 'ejs');


// Middleware that parses HTTP requests with JSON body
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const dbURI = 'mongodb+srv://netdb:test1234@schooldb.mxvsbfq.mongodb.net/schooldb?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser);
app.use("/", require("./api/routes"));
app.use("/", require("./api/authRoutes"));

//app.listen(3000);