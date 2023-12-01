const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./models/blog");

const dbURL = "mongodb+srv://namDoyun:doyunblog@cluster0.49z1yqf.mongodb.net/node-blog";

mongoose
  .connect(dbURL)
  .then((result) => app.listen(8000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// mongodb sandbox routes
  // app.get("/add-blog", (req, res) => {
  //   const blog = new Blog({
  //     title: "New Blog for AI Stack",
  //     snippet: "about the new tech added in the AI stack by industry giants",
  //     body: "Many industry giants have provided heavily to make the AI stack the most popular stack of 2023",
  //   });

  //   blog.save()
  //     .then((result) => {
  //       res.send(result)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // });

  // app.get("/all-blogs", (req, res) => {
  //   Blog.find()
  //     .then((result) => {
  //       res.send(result)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // })

  // app.get("/single-blog",(req, res) => {
  //   Blog.findById("6562f0f9f854224f1179d26b")
  //   .then((result) => {
  //     res.send(result)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // })

// app.use((req, res, next) => {
//   console.log("new request made");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// })

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  // ];
  // // res.send("<p>Home page</p>");
  // // res.sendFile("./views/index.html", {root: __dirname})
  // res.render("index", { title: "Home", blogs });
});
app.get("/about", (req, res) => {
  // res.send("<p>about page</p>");
  // res.sendFile("./views/about.html", {root: __dirname})
  res.render("about", { title: "About" });
});

// redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about", { title: "About" });
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {title: "All Blogs", blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
        res.redirect("/blogs")
      })
      .catch((err) => {
        console.log(err)
      })
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", {root: __dirname})
  res.status(404).render("404", { title: "404" });
});
