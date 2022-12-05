const express = require("express");
const app = express();

app.set('view engine', 'ejs');


// Middleware that parses HTTP requests with JSON body
app.use(express.json());
app.use(express.static('public'));

app.use("/api", require("./api/routes"));

//app.set('view engine', 'ejs');

//app.use(express.static('public'));

app.listen(3000);