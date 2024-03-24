import MDEditor from '@uiw/react-md-editor';
import { MessageType } from '../types';
import { BotIcon, UserIcon } from '../icons';
import './Message.css';

export const Message = ({ role, message, error, isLoading }: MessageType) => {
  const Icon = role === 'user' ? UserIcon : BotIcon;
  const title = role === 'user' ? 'Me' : 'Chatik';
  const fontColorClass = role === 'user' ? 'user-message' : 'bot-message';

  return (
    <div className="message-wrapper">
      <div className="message-header">
        <Icon />
        <p className="title">{title}</p>
      </div>
      {message && (
        <MDEditor.Markdown className={`message-content ${fontColorClass}`} source={message} />
      )}
      {isLoading && <div className="spinner" />}
      {error && <div className="error">{error}</div>}
    </div>
  );
};
