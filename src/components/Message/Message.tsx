import MDEditor from '@uiw/react-md-editor';
import { BotIcon, UserIcon } from '../../icons';
import { MessageType } from '../../types';
import { Spinner } from '..';
import './Message.css';

export const Message = ({ role, text, error, isLoading }: MessageType) => {
  const Icon = role === 'user' ? UserIcon : BotIcon;
  const title = role === 'user' ? 'Me' : 'Chatik';
  const fontColorClass = role === 'user' ? 'user-message' : 'bot-message';

  return (
    <div className="message-wrapper">
      <div className="message-header">
        <Icon />
        <p>{title}</p>
      </div>
      <div className="message-content">
        {text && <MDEditor.Markdown className={`message-text ${fontColorClass}`} source={text} />}
        {isLoading && <Spinner />}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};
