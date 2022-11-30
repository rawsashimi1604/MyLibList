// https://www.postgresql.org/docs/current/datatype-datetime.html
// format : '2004-10-19 10:23:54'
export default function getCurrentTimestamp() {
  const dateTimeFromJS = new Date().toISOString();

  const date = dateTimeFromJS.split("T")[0];
  const time = dateTimeFromJS.split("T")[1].split(".")[0];

  return `${date} ${time}`;
}
