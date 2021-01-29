const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/services", (req, res) => {
  res.render("services");
});

app.listen(3000, () => {
  console.log("Listining to the port 3000");
});
