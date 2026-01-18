import React, { useState } from "react";
export const useSuggestedLevel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenSuggestOpen = () => {
        setIsOpen(prev => !prev)
    }
    return {isOpen, handleOpenSuggestOpen, setIsOpen}
}