const express=require("express");
const app=express();
const port=8080;
const path=require("path");


app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        username:"Ram",
        content:"Rom Rom bhaiyo"
    },
    {
         username:"Om",
        content:"Hardwork"
    },

    {
         username:"Jai",
        content:"Success"
    }
];


app.listen(port,()=>{
    console.log(`App is listening at ${port}`);

})

app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get('/posts/new',(req,res)=>{
    res.render("form.ejs");
})

app.post("/posts",(req,res)=>{
    
    let {username,content}=req.body;
    posts.push({username,content});
    // console.log(req.body);
    
    res.redirect("/posts");
})
