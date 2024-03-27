import MDEditor from '@uiw/react-md-editor';
import { BotIcon, UserIcon } from '../../../icons';
import { MessageType } from '../../../types';
import { Spinner } from '../../Spinner';
import { useMemo } from 'react';
import { useUserScope } from '../../../scopes';
import './Message.css';

export const Message = ({ role, text, error, isLoading }: MessageType) => {
  const { user } = useUserScope();

  const title = role === 'user' ? 'Me' : 'Chatik';
  const fontColorClass = role === 'user' ? 'user-message' : 'bot-message';

  const Avatar = useMemo(() => {
    if (role === 'user') {
      return user?.photoURL ? <img src={user.photoURL} className="avatar" /> : <UserIcon />;
    }

    return <BotIcon />;
  }, [role]);

  return (
    <div className="message-wrapper">
      <div className="message-header">
        {Avatar}
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
