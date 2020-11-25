# Readwell 2

## Background

Kayla is very happy for your help on her website! You helped her move from JSON files to MongoDB, and Readwell is now faster and more popular.

However, she wants to add some new features. Specifically, she wants to let user add, edit, and delete books. She made some changes to her web pages, but she needs your help to make them work with MongoDB.

## Task summary

Write some more API endpoints in the Express server code to correctly add, edit, and delete books in a database collection.

You will create and use your OWN database on Atlas (see section "getting started");.

## Endpoints

You need to write endpoints for three kinds of requests:

```
POST /api/books
DELETE /api/books/:id
PUT /api/books/:id
```

## The endpoints in more detail

### POST

When you send a POST request to `/api/books` with query parameters `title`, `author`, `author_birth_year`, `author_death_year`, and `url`, it should create a new book with those fields.

- Make sure that only those fields are added.
- If a query parameter is missing, return a 400 error.
- Make sure that the year is a number in the database (not a string).
- If it is successful, return the document with the `_id`.

For example, a POST to

`/api/books?title=Emma&author=Austen&author_birth_year=1775&author_death_year=1817&url=http://gutenberg.org/ebooks/158`

should create a book like this and return it in the response JSON body:

```
{
_id: ObjectId("5d07ffd81f64563a64fb0f1e"),
title: "Emma",
author: "Austen",
author_birth_year: 1775,
author_death_year: 1817,
url: "http://gutenberg.org/ebooks/158"
}
```

### DELETE

When you send a DELETE request to `/api/books/:id`, it should delete the new book with that ID.

- If the ID is not a valid ObjectId string, return a 400 error.
- If there is no document in the collection with that ID, return a 404 error.

For example, if you send a DELETE request to `/api/books/5d07ffd81f64563a64fb0f1e`, then it should delete a document from the collection with the ID `5d07ffd81f64563a64fb0f1e` if it exists.

### PUT

When you send a PUT request to `/api/books/:id`, it should update the book with that ID with the JSON object body.

- If the id is not a valid ObjectId string, return a 400 status code.
- Allow only the properties `_id`, `title`, `year`, and `actors`. Do not allow objects with missing properties. Only allow the correct data type for each property.
- Do not allow the `_id` to be changed.
- If the JSON body is not allowed, return a 422 status code.
- If no film has that `_id`, return a 404 status code.
- If the update is successful, return a 204 status code and the updated document in the body.

For example, if there is a book with `_id: ObjectId("5d07ffd81f64563a64fb0f1e")`, then sending a PUT request to `/api/books/5d057f95243295255b98b6a0` should update that book with the JSON body.

## Getting started

Use **your own** database from MongoDB Atlas. Create a database called `literature` and a collection called `books`. See week 2 of the syllabus for instructions on this if needed.

You can continue working on your project from last week or you can start by downloading the code here:

https://github.com/garethbjohnson/cyf-db-homework-2

Follow the instructions in readme.md to run it locally.

Edit the code in `server.js`.
