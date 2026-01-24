import React, { useState } from "react";
export const useCustomHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCustomHeader = () => {
    setIsOpen((prev) => !prev);
  };
  return{isOpen, handleCustomHeader, setIsOpen}
};
