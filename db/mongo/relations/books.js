import { mongoClient } from "../config.js";

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

    // Update the user...
    const updateUser = db.collection("users").updateOne(
      { email: email },
       
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
  addLikeToBook
};
