require("dotenv").config()
const express = require("express");
const mongodb = require("mongodb");

const app = express();

const uri = process.env.DATABASE_URI;


app.get("/api/books", function (req, res) {
const client = new mongodb.MongoClient(uri)
client.connect(function(){
  const db = client.db("literature");
  const collection = db.collection("books")
  collection.find().toArray(function(error, results){
    res.json(error|| results);
    client.close();
  })
})

  // Make this work!
});
//get one by title
// If you add the query parameter title or author, you should get only books with the corresponding title or author value.
app.get("/api/search", (req, res)=>{
  const client = new mongodb.MongoClient(uri);
client.connect(function(){
  const db = client.db("literature");
  const collection = db.collection("books");
  const title = req.query.title;
  const author = req.query.author;
  const searchObj = {title}
  const authorSearch = {author}
  collection.findOne(authorSearch||searchObj , function(error, result){
    res.json(error|| result)
  })
})
})

//For example, if you go to /api/books/5cfc28b7af37addd3cb1e7d2, you should only get the book with an _id of "5cfc28b7af37addd3cb1e7d2".
app.get("/api/books/:id",  (req, res)=> {
  const client = new mongodb.MongoClient(uri);
  client.connect(()=>{
const db = client.db("literature");
const collection = db.collection("books");
const string = req.params.id;
const  id =new mongodb.ObjectID(string)
 const searchObj = {_id: id}
 collection.findOne(searchObj, (error, result)=>{

   if(!result){
     res.status(404).json({ epmty: "There is not resulut thanks", error: error});
   }else if(!mongodb.ObjectID.isValid(id)){
     res.status(400).json("Not valid id")
   }
   else{
   res.json({success: "Success", result: result })
   }
 })
  })
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/books/:id", function (request, response) {
  response.sendFile(__dirname + "/book.html");
});

app.get("/authors/:name", function (request, response) {
  response.sendFile(__dirname + "/author.html");
});

app.listen(process.env.PORT, ()=>console.log(`The server is running on port ${process.env.PORT}`));