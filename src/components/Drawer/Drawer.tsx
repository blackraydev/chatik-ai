import { Link } from 'react-router-dom';
import { BotIcon, CreateIcon } from '../../icons';
import { useConversationsScope, useDrawerVisibilityScope, useMessagesScope } from '../../scopes';
import { Spinner } from '../Spinner';
import { ConversationsList } from './ConversationsList';
import { UserDetails } from './UserDetails';
import './Drawer.css';

export const Drawer = () => {
  const { conversations, startNewConversation, isConversationsLoading } = useConversationsScope();
  const { messages, clearMessages } = useMessagesScope();
  const { isDrawerVisible, hideDrawer } = useDrawerVisibilityScope();

  const overlayClassName = isDrawerVisible ? 'overlay visible' : 'overlay';
  const drawerClassName = isDrawerVisible ? 'drawer visible' : 'drawer';

  const handleStartNewConversation = () => {
    if (messages.length) {
      startNewConversation();
      clearMessages();
    }

    hideDrawer();
  };

  const renderConversations = () => {
    if (isConversationsLoading) {
      return (
        <div className="drawer-content-wrapper">
          <Spinner size="medium" />
        </div>
      );
    }
    if (!conversations.length) {
      return (
        <div className="drawer-content-wrapper">
          <p>No chats yet</p>
        </div>
      );
    }

    return <ConversationsList />;
  };

  return (
    <div className={overlayClassName} onClick={hideDrawer}>
      <div className={drawerClassName} onClick={(e) => e.stopPropagation()}>
        <Link className="new-chat" to={'/'} onClick={handleStartNewConversation}>
          <div className="action">
            <BotIcon size={24} />
            <p>New chat</p>
          </div>
          <CreateIcon />
        </Link>
        {renderConversations()}
        <UserDetails />
      </div>
    </div>
  );
};
