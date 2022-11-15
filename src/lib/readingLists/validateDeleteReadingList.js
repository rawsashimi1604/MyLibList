// Validate the data received from client is correct!
export default function validateAddReadingList(readingListObject) {
  // Check if object was passed in...
  if (typeof readingListObject !== "object") return false;

  // Check if require key value pairs exist
  if (!readingListObject["email"]) return false;
  if (!readingListObject["reading_list_id"]) return false;

  if (readingListObject["email"].length > 128) return false;

  // Check was successful.
  return true;
}
