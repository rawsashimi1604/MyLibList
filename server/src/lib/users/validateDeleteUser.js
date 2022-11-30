// Validate the data received from client is correct!
export default function validateDeleteUser(userObject) {
  // Check if object was passed in...
  if (typeof userObject !== "object") return false;

  // Check if require key value pairs exist
  if (!userObject["email"]) return false;

  // Check was successful.
  return true;
}
