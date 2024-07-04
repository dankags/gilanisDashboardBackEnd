export function getStartAndEndDateYearUTC(yearString) {
  const year = parseInt(yearString, 10);

  // Construct startDate as January 1st of the given year
  const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));

  // Construct endDate as January 1st of the next year
  const endDate = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0));

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}