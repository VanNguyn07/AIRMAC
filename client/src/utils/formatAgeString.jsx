export const formatAgeString = (totalMonths) => {
  if (!totalMonths || isNaN(totalMonths)) return "N/A";
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) {
    return `${months} Months`;
  }
  if (months === 0) {
    return `${years} Years`;
  }
  return `${years} Years ${months} Months`;
};
