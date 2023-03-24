import ReactMarkdown from 'react-markdown';
import './ChatBubble.scss';

export const ChatBubble = ({message}) => {
  return (
    <div
      className={`test-card ${message.isFromUser ? "from-user" : "from-bot"}`}
      key={message.id}
    >
      <div>
        <ReactMarkdown children={message.text} />
      </div>
    </div>
  )
}
