import ReactMarkdown from 'react-markdown';
import './ChatBubble.scss';

export const ChatBubble = ({message}) => {
  return (
    <div
      className={`test-card ${message.role == 'user' ? "from-user" : "from-bot"}`}
      key={message.id}
    >
      <div>
        <ReactMarkdown children={message.content} />
      </div>
    </div>
  )
}
