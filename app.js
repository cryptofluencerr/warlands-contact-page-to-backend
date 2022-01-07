const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// import { MongoClient } from 'mongodb'
mongoose.connect("mongodb://localhost:27017/contactsDB", {
  useNewUrlParser: true,
});
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { type: String },
  message: { type: String },
});

const Contact = mongoose.model("Contact", contactSchema);

app
  .route("/")
  .get((req, res) => {
    res.sendFile(__dirname + "/index.html");
  })
  .post((req, res) => {
    const contact = new Contact({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      message: req.body.message,
    });
    contact.save();
    // console.log(
    //   req.body.fname,
    //   req.body.lname,
    //   req.body.email,
    //   req.body.message
    // );
    res.send("Success!");
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
