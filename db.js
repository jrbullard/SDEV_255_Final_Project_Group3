const mongoose = require("mongoose");
//mongoose.set("useUnifiedTopology", true);

//const dbURI = 'mongodb+srv://netdb:test1234@schooldb.mxvsbfq.mongodb.net/schooldb?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose;