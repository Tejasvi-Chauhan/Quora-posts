const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid'); // Used to generate unique IDs automatically

const methodOverride = require('method-override'); // Required to use HTTP methods like PATCH & DELETE via forms

app.use(methodOverride('_method')); // Enables method override using query param "_method"

app.use(express.urlencoded({ extended: true })); // Parses form data and puts it into req.body

app.set("view engine", "ejs"); // Setting view engine to EJS
app.set("views", path.join(__dirname, "views")); // Setting views directory
app.use(express.static(path.join(__dirname, "public"))); // Serving static files (like CSS, images, etc.)

// ----------------------- Dummy Data -----------------------
let posts = [
    {
        id: uuidv4(),
        username: "Ram",
        content: "Rom Rom bhaiyo"
    },
    {
        id: uuidv4(),
        username: "Om",
        content: "Hardwork"
    },
    {
        id: uuidv4(),
        username: "Jai",
        content: "Success"
    }
];

// ----------------------- Server Start -----------------------
app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});

// ----------------- Display all posts -----------------
app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

// --------------- Render form to create a new post ---------------
app.get('/posts/new', (req, res) => {
    res.render("form.ejs");
});

// ------------- Create a new post -------------
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

// ---------- Show a particular post in detail ----------
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

// ----------- Render edit form for a particular post -----------
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

// ----------- Update a particular post -----------
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcon = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcon;
    res.redirect("/posts");
});

// ----------- Delete a particular post -----------
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
