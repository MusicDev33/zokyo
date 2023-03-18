import React, { useState, useRef } from "react";

// Written with ChatGPT!
export const AutogrowField = ({ maxHeight }) => {
  const [value, setValue] = useState("");
  const [shiftPressed, setShiftPressed] = useState(false);
  const textareaRef = useRef(null);

  const handleKeyUp = (e) => {
    if (e.keyCode === 16) { // Shift key code
      console.log('off');
      setShiftPressed(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 16) { // Shift key code
      console.log('on');
      setShiftPressed(true);
    }

    if (e.keyCode === 13) {
      // Do something with the text
      console.log(value);
    }
  }

  const handleChange = (event) => {
    console.log(shiftPressed);

    if (shiftPressed && textareaRef.current) {
      setValue(event.target.value);
      textareaRef.current.style.height = "auto";
      
      if (textareaRef.current.scrollHeight <= maxHeight) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      } else {
        textareaRef.current.style.height = `${maxHeight}px`;
      }
    } else {
      
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