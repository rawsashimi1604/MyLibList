
async function handleIndex(req, res) {
    res.send("reading list route single data...");
  }
  
  async function handleAllReadingList(req, res){
      res.send("Hit get /api/readingList/all...");
  }
  
  async function handleAddReadingList(req, res){
      res.send("Hit post /api/readingList/addReadingList...");
  }
  
  async function handleDeleteReadingList(req, res){
      res.send("Hit delete /api/readingList/...");
  }
  
  async function handleAddBookToReadingList(req, res){
      res.send("Hit post /api/readingList/book...");
  }
  
  async function handleDeleteBookFromReadingList(req, res){
      res.send("Hit delete /api/readingList/book...");
  }
  
  export default {
    handleIndex,
    handleAllReadingList,
    handleAddReadingList,
    handleDeleteReadingList,
    handleAddBookToReadingList,
    handleDeleteBookFromReadingList
  }
  