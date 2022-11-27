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
    
    // Iterate through user likes, check if book Object ID in likes array.
    let bookIsLiked = false;
    for (const ref of getUser.likes) {
      const id = ref.toJSON().$id;
      if (id.toString() === getBook._id.toString()) {
        bookIsLiked = true;
        break;
      }
    }

    // If book is liked, return the liked book
    if (bookIsLiked) {
      return {
        rows: [getUser]
      }
    } 

    // Else return null
    return {
      rows: []
    }

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
    const updateUser = await db.collection("users").updateOne(
      { email: email },
      { $push: {likes: {"$ref" : "books", "$id" : ObjectId(findBook._id)  }}}
    )
    
    return {
      rows: [res]
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteLikeFromBook(email, book_uuid) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    
    // decrement book likes
    const res = await db.collection("books").updateOne(
      { book_uuid: book_uuid },
      { $inc: { likes: -1 }}
    );

    // Get the book ObjectID
    const findBook = await db.collection("books").findOne(
      { book_uuid: book_uuid }
    );

    // Remove DBRef from user likes array
    const updateUser = await db.collection("users").updateOne(
      { email: email },
      { $pull: {likes: {"$ref" : "books", "$id" : ObjectId(findBook._id)  }}}
    )

    if (updateUser.modifiedCount >= 1) {
      return {
        rows: [findBook]
      }
    }

    return {
      rows: []
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getBookBySearchParams(query) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");


    // GENERATE WHITELIST
    const whitelist = [
      "book_uuid",
      "title",
      "language",
      "collection",
      "subject",
      "contributor",
      "lcsh",
      "publisher",
    ];
    
    const queryObject = {}

    for (const queryParam of Object.keys(query)) {
      console.log(queryParam)

      if (queryParam === "book_uuid") {
        queryObject[queryParam] = query[queryParam];
      }

      else if (queryParam === "title") {
        queryObject[queryParam] = new RegExp('.*' + query[queryParam].toLowerCase() + '.*')
      }

      else if (queryParam === "language") {
        // queryObject[queryParam] = query[queryParam];

        // Match array
        queryObject["languages"] = [query[queryParam]]
      }

      else if (queryParam === "collection") {
        queryObject["collections"] = [query[queryParam]]
      }

      else if (queryParam === "subject") {
        queryObject[queryParam] = query[queryParam];
      }

      else if (queryParam === "contributor") {
        queryObject[queryParam] = query[queryParam];
      }

      else if (queryParam === "lcsh") {
        queryObject[queryParam] = query[queryParam];
      }

      else if (queryParam === "publisher") {
        queryObject[queryParam] = new RegExp('.*' + query[queryParam].toLowerCase() + '.*')
      }

    }

    console.log(queryObject)

    const books = await db.collection("books").find(
      queryObject
    ).toArray()

    console.log(books)

    // console.log(query);

  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getTopBooksByLikes,
  checkBookExists,
  addLikeToBook,
  checkIfBookIsLiked,
  deleteLikeFromBook,
  getBookBySearchParams
};
