import ReactMarkdown from 'react-markdown';
import './ChatBubble.scss';

export const ChatBubble = ({message}) => {
  return (
    <div
      className={`test-card ${message.role == 'user' ? "from-user" : "from-bot"}`}
      key={'' + message.timestamp}
    >
      <div>
        <ReactMarkdown children={message.content} breaks={true} />
      </div>
    </div>
  )
}
