const express = require("express");
const mongodb = require("mongodb");

const app = express();

const uri = process.env.DATABASE_URI;

console.log("Server Running!");

app.get("/api/books", function (request, response) {
  // Make this work!
});

app.get("/api/books/:id", function (request, response) {
  // Make this work, too!
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

app.listen(process.env.PORT);
