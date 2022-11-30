export default function validateUserLogin(userObject) {
  // Check if object was passed in...
  if (typeof userObject !== "object") return false;

  // Check if require key value pairs exist
  if (!userObject["email"]) return false;
  if (!userObject["password"]) return false;

  // Check was successful.
  return true;
}
