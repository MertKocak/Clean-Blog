const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const path = require("path");

const app = express();

//connect db
mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//template engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {posts});
});
app.get("/about", (req, res) => {
  res.render('about');
});
app.get("/post", (req, res) => {
  res.render('post');
});
app.get("/add_post", (req, res) => {
  res.render('add_post');
});
app.post("/posts", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
