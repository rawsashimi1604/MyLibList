import db from "../config.js";

function getAllBookList(){
    try {
        const query = `SELECT * FROM "book_lists"`;
        return db.query(query);
      } catch (err) {
        console.log(err);
        throw err;
      }
}

function addBookList(bookList){
    try{
        const query = `INSERT INTO "book_lists"(
            reading_list_id,
            book_uuid,
            timestamp_created_on) VALUES ($1, $2, $3)
        )`;

        const params = [
            bookList.reading_list_id,
            bookList.book_uuid,
            bookList.timestamp_created_on
        ]
        return db.query(query, params);
    }catch (err) {
        console.log(err);
        throw err;
      }
}

export default { getAllBookList, addBookList };