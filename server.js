const express = require("express");
const app = express();

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

app.use("/api", require("./api/route"));

app.set('view engine', 'ejs');

app.listen(3000);