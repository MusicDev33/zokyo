import React, { useState, useRef } from "react";

// Written with ChatGPT!
export const AutogrowField = ({ maxHeight }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    textareaRef.current.style.height = "auto";
    
    if (textareaRef.current.scrollHeight <= maxHeight) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    } else {
      textareaRef.current.style.height = `${maxHeight}px`;
    }
  };

  return (
    <textarea
      className="input-main"
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      style={{ resize: "none", overflow: "hidden", maxHeight: `${maxHeight}px` }}
    />
  );
}