require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/serviceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const serviceSchema = new mongoose.Schema({
  title: String,
  body: String,
  price: Number,
});

const Service = new mongoose.model("Service", serviceSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/services", (req, res) => {
  Service.find((err, foundServices) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      if (foundServices) {
        res.render("services", { services: foundServices });
      }
    }
  });
});
app.get("/createService", (req, res) => {
  res.render("createService");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });

  var mailOptions = {
    from: '"imjoymhnt" <onlineformfillup3@gmail.com>',
    to: "mitul.joy.mahanta@gmail.com",
    subject: "Hello from PC Repair",
    text: req.body.name + "from " + req.body.email + "says " + req.body.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("error");
    } else {
      console.log("Message send");
      res.redirect("/");
    }
  });
});

app.post("/createService", (req, res) => {
  const service = new Service({
    title: req.body.title,
    body: req.body.body,
    price: req.body.price,
  });
  service.save((err) => {
    if (err) {
      console.log("err in post");
      res.redirect("/createService");
    } else {
      res.redirect("services");
    }
  });
});

app.listen(3000, () => {
  console.log("Listining to the port 3000");
});
