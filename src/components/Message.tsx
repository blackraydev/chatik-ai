import { MessageType } from '../types';

export const Message = ({ initiator, message }: MessageType) => {
  const avatarSrc = initiator === 'User' ? 'user.png' : 'bot.webp';
  const title = initiator === 'User' ? 'Me' : 'Chatik';

  return (
    <div className="message-wrapper">
      <div className="message-header">
        <img className="avatar" src={`/assets/${avatarSrc}`} />
        <p className="title">{title}</p>
      </div>
      <div className="message-content">{message}</div>
    </div>
  );
};
