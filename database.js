const mongoose = require('mongoose');
//require('dotenv').config();

const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/arduino'

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  return console.log("Connection DB established");
}).catch(err => {
  return console.log(err);
});