import MDEditor from '@uiw/react-md-editor';
import { MessageType } from '../types';
import './Message.css';

export const Message = ({ initiator, message, error, isLoading }: MessageType) => {
  const avatarSrc = initiator === 'User' ? 'user.png' : 'bot.webp';
  const title = initiator === 'User' ? 'Me' : 'Chatik';

  return (
    <div className="message-wrapper">
      <div className="message-header">
        <img className="avatar" src={`/telegram-mini-app/assets/${avatarSrc}`} />
        <p className="title">{title}</p>
      </div>
      {message && <MDEditor.Markdown className="message-content" source={message} />}
      {isLoading && <div className="spinner" />}
      {error && <div className="error">{error}</div>}
    </div>
  );
};
