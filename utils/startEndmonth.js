export function getStartAndEndDate(timeProductSold) {
  const date = new Date(timeProductSold);

  // Construct startDate
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    2,
    0,
    0,
    0,
    0
  );

  // Construct endDate
  let endMonth = date.getMonth() + 1;
  let endYear = date.getFullYear();

  if (endMonth > 11) {
    // Handle December case
    endMonth = 0; // January of the next year
    endYear += 1;
  }

  const endDate = new Date(endYear, endMonth, 2, 0, 0, 0, 0);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}