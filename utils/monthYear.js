export function getStartAndEndDateUTC(dateString) {
  // Function to parse the date string "dd-mmm-yyyy"
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const monthIndex = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    }[month.toLowerCase()];
    return new Date(Date.UTC(year, monthIndex, day));
  };

  const date = parseDate(dateString);

  // Construct startDate
  const startDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
  );

  // Construct endDate
  let endMonth = date.getMonth() + 1;
  let endYear = date.getFullYear();

  if (endMonth > 11) {
    // Handle December case
    endMonth = 0; // January of the next year
    endYear += 1;
  }

  const endDate = new Date(Date.UTC(endYear, endMonth, 1, 0, 0, 0, 0));

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}
