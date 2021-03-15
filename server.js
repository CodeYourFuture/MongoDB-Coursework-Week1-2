require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");

const app = express();

const uri = process.env.DATABASE_URI;
const uri2 = process.env.DATABASE_URI_SECOND;
app.use(express.json());
app.get("/api/books", function (req, res) {
  const client = new mongodb.MongoClient(uri);
  client.connect(function () {
    const db = client.db("literature");
    const collection = db.collection("books");
    collection.find().toArray(function (error, results) {
      res.json(error || results);
      client.close();
    });
  });

  // Make this work!
});
//get one by title
// If you add the query parameter title or author, you should get only books with the corresponding title or author value.
app.get("/api/search", (req, res) => {
  const client = new mongodb.MongoClient(uri);
  client.connect(function () {
    const db = client.db("literature");
    const collection = db.collection("books");
    const title = req.query.title;
    const author = req.query.author;
    const searchObj = { title };
    const authorSearch = { author };
    collection.findOne(authorSearch || searchObj, function (error, result) {
      res.json(error || result);
    });
  });
});

//For example, if you go to /api/books/5cfc28b7af37addd3cb1e7d2, you should only get the book with an _id of "5cfc28b7af37addd3cb1e7d2".
app.get("/api/books/:id", (req, res) => {
  const client = new mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("literature");
    const collection = db.collection("books");
    const string = req.params.id;
    const id = new mongodb.ObjectID(string);
    const searchObj = { _id: id };
    collection.findOne(searchObj, (error, result) => {
      if (!result) {
        res
          .status(404)
          .json({ epmty: "There is not resulut thanks", error: error });
      } else if (!mongodb.ObjectID.isValid(id)) {
        res.status(400).json("Not valid id");
      } else {
        res.json({ success: "Success", result: result });
      }
    });
  });
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
//<--------------------------week-2-------------------------------------------------------->
app.post("/api/books", (req, res) => {
  const client = new mongodb.MongoClient(uri2);
  client.connect(() => {
    const db = client.db("Literatures");
    const collection = db.collection("books");
    const updateObj = {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      author_birth_year: 1775,
      author_death_year: 1817,
      url: "http://www.gutenberg.org/files/1342/1342-h/1342-h.htm",
    };

    collection.insertOne(updateObj, (error, result) => {
      res.send(error || result.ops);
    });
  });
});
//Or I can do the same as enpoind but instead get the data from query paramaters;
app.post("/api/insert", (req, res) => {
  const client = new mongodb.MongoClient(uri2);
  client.connect(() => {
    const db = client.db("Literatures");
    const collection = db.collection("books");
    const title = req.query.title;
    const author = req.query.author;
    const brirthYear = req.query.author_birth_year;
    const deathYear = req.query.author_death_year;
    const url = req.query.url;
    // console.log(title, author, brirthYear, deathYear, url);
    const insertObj = { title, author, brirthYear, deathYear, url };
    collection.insertOne(insertObj, (error, result) => {
      if (!error) {
        res.json(result.ops);
      } else {
        res.json(error);
      }
    });
  });
});
// Put method
app.put("/api/books/:id", (req, res) => {
  const client = new mongodb.MongoClient(uri2);
  client.connect(() => {
    const db = client.db("Literatures");
    const collection = db.collection("books");
    const string = req.params.id;
    const id = mongodb.ObjectID(string);
    const {
      title,
      author,
      author_birth_year,
      author_death_year,
      url,
    } = req.body;

    const searchObj = {
      _id: id,
    };
    const updateObj = {
      $set: {
        title,
        author,
        author_birth_year,
        author_death_year,
        url,
      },
    };

    const options = { returnOriginal: true };
  });
});

//delete a collection
app.delete("/api/book/:id", (req, res) => {
  const client = new mongodb.MongoClient(uri2);
  client.connect(() => {
    const db = client.db("Literatures");
    const collection = db.collection("books");
    const string = req.params.id;
    console.log(string);
    const id = mongodb.ObjectID(string);
    const deleteObj = { _id: id };
    collection.findOneAndDelete(deleteObj, (error, result) => {
      res.json(error || result.deletedCount);
      client.close();
    });
  });
});

app.listen(process.env.PORT, () =>
  console.log(`The server is running on port ${process.env.PORT}`)
);
