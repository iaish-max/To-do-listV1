const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));

let items = [];
let workList = [];

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');  // see ejs doc.

app.get("/" , function(req,res){

  let options = { weekday: 'long', year: 'numeric', day: 'numeric', month: 'long'}; // search it in google date format in js(stack-overflow).
  let today  = new Date(); // search it in google date format in js(stack-overflow).

  res.render("list", {ListTitle: today.toLocaleDateString("en-US", options) ,newListItems: items , value: "items"}); // see ejs doc.
});

app.post("/",function(req,res){
  let item = req.body.newItem;

  console.log(req.body);

  if(req.body.button === "workitems")
  {
    workList.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work",function(req,res){
  res.render("list",{ListTitle: "Work List" ,newListItems: workList , value: "workitems"})  // see ejs doc.
});

app.get("/about",function(req,res){
  res.render("about");   // see ejs doc.
});


app.listen(3000,function(){
  console.log("Server is running at 3000");
});
