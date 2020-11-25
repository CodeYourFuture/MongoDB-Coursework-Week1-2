# Readwell Project

## Background

Your friend Kayla needs your help!

A few months ago, Kayla built a simple website called “Readwell”. On Readwell, you can discover classic books to read online.

Soon, Kayla’s website became very popular! However, some users were getting angry, because it was too slow. This is because Kayla was putting all her data into multiple files, and she soon got too many files.

Then, Kayla decided to use MongoDB. She heard that it was better for lots of data. She spent a long time turning her files into documents on a MongoDB server.

However, Kayla does not know how to connect her server to the MongoDB database! Luckily, she knows someone who can do it: you!

## Task Summary

Your job is to write some API endpoints in the Express server code to correctly return books from the MongoDB collection.

## Endpoints

You need to write two endpoints:

```
GET /api/books          // to get all books, or books matching a query
GET /api/books/:id      // to get one book by id
```

1. When you make a GET request to `/api/books`, you should get all books (if there are no query parameters given).

2. If you add the query parameter title or author, you should get only books with the corresponding title or author value.

3. If you add both of those query parameters, you should only get books matching **both** the title and the author value.

   - For example, `/api/books?author=Jane Austen&title=Pride` and Prejudice should only get books with the author Jane Austen and title Pride and Prejudice.

4. When you make a GET request to `/api/books/:id`, you should only get the book with that ID.

   - For example, if you go to `/api/books/5cfc28b7af37addd3cb1e7d2`, you should only get the book with an `_id` of `"5cfc28b7af37addd3cb1e7d2"`.

5. If you give an ID that you cannot use for an ObjectId, you should get a 400 response.

6. If you give a valid ObjectId string but there is no matching book in the collection, you should get a 404 response.

## Getting started

To get this example project running use:

1. Run `npm install`
2. Run `npm run start`

You can find a working version of the example project here:

https://glitch.com/~cyf-db-lesson-1-homework

## Database Details

A database already exists, already with books in it. You can simply connect to it:

- Connection URI: `mongodb+srv://cyf:LetsLearnMongoDB2019@cluster0-cxacx.mongodb.net`
- Database name: `literature`
- Collection name: `books`.
