async function handleIndex(req, res) {
  res.send("Book route...");
}

async function handleDeleteBook(req, res) {
  res.send("Hit delete /api/book...");
}

async function handleUpdateBookmark(req, res) {
  res.send("Hit put /api/book/addBookmark...");
}

async function handleAddLike(req, res) {
  res.send("Hit post /api/book/like...");
}

async function handleUpdateStatus(req, res) {
  res.send("Hit put /api/book/status...");
}

async function handleGetTopBooks(req, res) {
  res.send("Hit get /api/book/topBooks...");
}

export default {
  handleIndex,
  handleDeleteBook,
  handleUpdateBookmark,
  handleAddLike,
  handleUpdateStatus,
  handleGetTopBooks,
};
