import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export const useCalculateAge = () => {
  const {t} = useLanguage();
  const [dob, setDob] = useState("");

  // 1. Hàm tính toán (Giữ nguyên logic của bạn)
  const calculateAgeLogic = (dateString) => {
    if (!dateString) return { text: "", totalMonth: 0 };
    
    const today = new Date();
    const birthDate = new Date(dateString);

    if (isNaN(birthDate.getTime())) return { text: "", totalMonth: 0 };

    let totalMonth = (today.getFullYear() - birthDate.getFullYear()) * 12;
    totalMonth -= birthDate.getMonth();
    totalMonth += today.getMonth();

    if (today.getDate() < birthDate.getDate()) {
      totalMonth--;
    }

    if (totalMonth < 0) totalMonth = 0;

    const years = Math.floor(totalMonth / 12); // làm tròn về số nguyên nhở hơn gần nhất 
    const months = totalMonth % 12;
    let text = "";
    if (years > 0) text += `${years} ${t("year")}`;
    if (months > 0 || years === 0) text += ` ${months} ${t("month")}`;
    
    return { text, totalMonth };
  };

  // 2. TÍNH TOÁN TRỰC TIẾP (Derived State)
  // Bất cứ khi nào component render (do dob đổi), dòng này sẽ chạy lại
  // Không cần useEffect, không cần useState dư thừa
  const { text: ageDisplay, totalMonth: ageMonth } = calculateAgeLogic(dob);

  // 3. Handle change chỉ cần setDob
  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  return {
    dob,
    setDob,
    ageDisplay, // Biến này tự động cập nhật theo dob
    ageMonth,   // Biến này cũng vậy
    handleDobChange,
  };
};