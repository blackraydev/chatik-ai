import MDEditor from '@uiw/react-md-editor';
import { MessageType } from '../types';
import { BotIcon, UserIcon } from '../icons';
import './Message.css';

export const Message = ({ initiator, message, error, isLoading }: MessageType) => {
  const Icon = initiator === 'User' ? UserIcon : BotIcon;
  const title = initiator === 'User' ? 'Me' : 'Chatik';
  const fontColorClass = initiator === 'User' ? 'user-message' : 'bot-message';

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
