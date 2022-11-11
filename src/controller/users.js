async function handleRegisterUser(req, res){
  res.send("Hit Post /api/user ...");
}

async function handleGetUserData(req, res){
  res.send("User route...");
}

async function handleChangePassword(req, res){
  res.send("Hit Put /api/user/changePassword");
}

async function handleDeleteUser(req, res){
  res.send("Hit Delete /api/user...");
}

async function handleGetLikeBooks(req, res){
  res.send("Hit Get /api/user/likedBooks ...");
}

async function handleGetBookmark(req, res){
  res.send("Hit Get /api/user/bookmark...");
}

async function handleGetBookStatus(req, res){
  res.send("Hit Get /api/user/bookStatus...");
}




export default{
  handleRegisterUser,
  handleGetUserData,
  handleChangePassword,
  handleDeleteUser,
  handleGetLikeBooks,
  handleGetBookmark,
  handleGetBookStatus
};