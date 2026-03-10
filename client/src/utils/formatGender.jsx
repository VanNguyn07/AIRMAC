export const formatGender = (text, t) => {
  if (text === "male") {
    return t("male");
  }
  if (text === "female") {
    return t("female");
  }
};
