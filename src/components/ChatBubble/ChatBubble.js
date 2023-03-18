import React, { Component } from 'react';
import './ChatBubble.scss';

export const ChatBubble = ({message}) => {
  return (
    <div
      className={`glass-card ${message.isFromUser ? "from-user" : "from-bot"}`}
      key={message.id}
    >
      <p>{message.text}</p>
    </div>
  )
}
