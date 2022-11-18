export default function validateBookStatus(bookStatusObj) {
  if (typeof bookStatusObj !== "object") return false;

  return true;
}
