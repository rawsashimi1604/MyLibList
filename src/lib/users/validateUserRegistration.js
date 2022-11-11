export default function validateUserRegistration(userObject) {
  // Check if object was passed in...
  if (typeof userObject !== "object") return false;

  // Check if require key value pairs exist
  if (!userObject["email"]) return false;
  if (!userObject["password"]) return false;
  if (!userObject["first_name"]) return false;
  if (!userObject["last_name"]) return false;

  // Check if password length is at least 6 characters long
  if (userObject.password.length < 6) return false;

  // Check was successful.
  return true;
}
