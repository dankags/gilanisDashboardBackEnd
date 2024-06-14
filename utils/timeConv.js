export const convertToISOString = (date) => {
  const regex = /(\d{2}-\w{3}-\d{4}) (\d{2}\.\d{2}\.\d{2}) (AM|PM)/;
  const match = date.match(regex);

  if (!match) {
      throw new Error("Invalid date format");
  }

  const datePart = match[1];
  let timePart = match[2];
  const meridian = match[3];

  // Convert time to 24-hour format
  let [hours, minutes, seconds] = timePart.split(".").map(Number);
  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridian === "AM" && hours === 12) {
    hours = 0;
  }

  // Format the date and time into a single string
  const dateTimeString = `${datePart} ${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Parse the date string into a Date object
  const dateObject = new Date(dateTimeString);

  // Convert the Date object to ISO format
  return dateObject.toISOString();
};