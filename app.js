const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const postController = require("./controllers/postControllers");
const pageController = require("./controllers/pageControllers");

const app = express();

//connect db
mongoose.connect("mongodb+srv://mertkocak2811:fdBnalkqFmDoIqIH@cluster-1.aguzn.mongodb.net/clean-blog?retryWrites=true&w=majority&appName=Cluster-1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Atlas bağlantısı başarılı!');
}).catch((err) => {
  console.error('MongoDB Atlas bağlantı hatası:', err);
});

//template engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.get("/", postController.getAllPosts);
app.get("/posts/:id", postController.getPost);
app.delete("/posts/:id", postController.deletePost);
app.put("/posts/:id", postController.updatePost);
app.post("/posts", postController.createPost);

app.get("/posts/edit/:id", pageController.getEditPage);
app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPostPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
