const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

//method-override package is used to override the get and post request because html forms
//does not support patch and delete request
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

//this is a package which is used for create a unique id
const {v4: uuidv4} = require("uuid");

let posts = [
    {
        id: uuidv4(),
        name: "Vansh",
        content: "Just exploring the world"
    },
    {
        id: uuidv4(),
        name: "Priyank",
        content: "I love to play cricket"
    },
    {
        id: uuidv4(),
        name: "Yogesh",
        content: "I am a web developer"
    }
]

app.get("/",(req,res)=>{
    res.redirect("/posts");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {name, content} = req.body;
    if(name && content){
        let id = uuidv4();
        posts.push({id, name, content});
    }
    //it is used to send a response again
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",post);
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})