export const formatAgeString = (totalMonths, t) => {
  if (!totalMonths || isNaN(totalMonths)) return "N/A";
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) {
    return `${months} ${t("month")}`;
  }
  if (months === 0) {
    return `${years} ${t("year")}`;
  }
  return `${years} ${t("year")} ${months} ${t("month")}`;
};
