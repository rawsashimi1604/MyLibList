import { mongoClient } from "../config.js";
import { DBRef } from "mongodb";
import { ObjectId } from "mongodb";

// TODO ADD FUNCTIONS TO QUERY DATABASE
async function getTopBooksByLikes(number_of_books) {

  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    
    // SORT Descending, limit number of books
    const res = await db.collection("books").find().sort(
      { likes: -1 }
    ).limit(number_of_books).toArray();
    
    return {
      rows: res
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function checkBookExists(book_uuid) {

  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    
    // SORT Descending, limit number of books
    const res = await db.collection("books").find(
      { book_uuid : book_uuid }
    ).toArray()
    
    return {
      rows: res
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function checkIfBookIsLiked(email, book_uuid){
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    
    const getBook = await db.collection("books").findOne(
      { book_uuid : book_uuid }
    )

    const getUser = await db.collection("users").findOne(
      { email : email }
    )

    console.log(getBook.likes);
    console.log(getUser.likes);

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addLikeToBook(book_uuid, email) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    
    // SORT Descending, limit number of books
    const res = await db.collection("books").updateOne(
      { book_uuid: book_uuid },
      { $inc: { likes: 1 }}
    );
    const findBook = await db.collection("books").findOne(
      { book_uuid: book_uuid }
    );

    const getUser = await db.collection("users").findOne(
      { email: email }
    );

   // Update the user...
    const updateUser = db.collection("users").updateOne(
      { email: email },
      { $push: {likes: {"$ref" : "books", "$id" : ObjectId(findBook._id)  }}}
       
    )

    console.log(res);
    
    return {
      rows: [res]
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getTopBooksByLikes,
  checkBookExists,
  addLikeToBook,
  checkIfBookIsLiked
};
