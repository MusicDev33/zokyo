import React, { useState, useRef } from "react";

// Written with ChatGPT!
export const AutogrowField = ({ maxHeight, handleEnter }) => {
  const [value, setValue] = useState("");
  const [shiftPressed, setShiftPressed] = useState(false);
  const textareaRef = useRef(null);

  const handleKeyUp = (e) => {
    if (e.keyCode === 16) { // Shift key code
      setShiftPressed(false);
    }
  }

  const handleKeyDown = (e) => {
    if (!e.shiftKey) {
      if (e.keyCode === 13) {
        // Do something with the text
        handleEnter(value);
        setValue('');
      }
    }

    if (e.keyCode === 16) { // Shift key code
      setShiftPressed(true);
    }
  }

  const handleChange = (event) => {
    const lastChar = event.target.value.charAt(event.target.value.length - 1);
    const isEnterKey = lastChar === '\n';

    if (shiftPressed && textareaRef.current) {
      setValue(event.target.value);
      textareaRef.current.style.height = "auto";
      
      if (textareaRef.current.scrollHeight <= maxHeight) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      } else {
        textareaRef.current.style.height = `${maxHeight}px`;
      }
    } else {
      if (isEnterKey) {
        return;
      }
      setValue(event.target.value);
    }
  };

  return (
    <textarea
      className="input-main"
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      style={{ resize: "none", overflow: "hidden", maxHeight: `${maxHeight}px` }}
    />
  );
}
