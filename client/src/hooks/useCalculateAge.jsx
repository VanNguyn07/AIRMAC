import React, { useState } from "react";

export const useCalculateAge = () => {
  const [dob, setDob] = useState("");
  const [ageDisplay, setAgeDisplay] = useState("");
  const [ageMonth, setAgeMonth] = useState(0);

  const handleCalculateAge = (dateString) => {
    const today = new Date();
    const dob = new Date(dateString);

    let totalMonth = (today.getFullYear() - dob.getFullYear()) * 12; // 2026 - 2000 = 312 month
    totalMonth -= dob.getMonth(); // 312 - 5 = 307
    totalMonth += today.getMonth(); // 307 8 1 = 308

    if (today.getDate() < dob.getDate()) {
      totalMonth--;
    }

    if (totalMonth < 0) totalMonth = 0;

    //  Tạo chuỗi hiển thị "X tuổi Y tháng"
    const years = Math.floor(totalMonth / 12);
    const months = totalMonth % 12;
    let text = "";
    if (years > 0) {
      text = text + `${years} years`;
    }
    if (months > 0 || years === 0) {
      text = text + ` ${months} months`;
    }
    console.log("Total Months ", totalMonth);
    return { text, totalMonth };
  };
  
  const handleDobChange = (e) => {
    const newDob = e.target.value;
    setDob(newDob);
    //call function handleCalculateAge to reuse
    const { text, totalMonth } = handleCalculateAge(newDob);
    setAgeDisplay(text);
    setAgeMonth(totalMonth);
  };
  return {
    dob,
    ageDisplay,
    ageMonth,
    handleDobChange,
  };
};
