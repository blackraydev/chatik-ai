import { BurgerMenuIcon, CreateIcon } from '../../icons';
import { useConversationsScope, useDrawerVisibilityScope, useMessagesScope } from '../../scopes';
import './Header.css';

export const Header = () => {
  const { startNewConversation } = useConversationsScope();
  const { clearMessages } = useMessagesScope();
  const { showDrawer } = useDrawerVisibilityScope();

  const handleStartNewConversation = () => {
    startNewConversation();
    clearMessages();
  };

  return (
    <div className="header">
      <div className="addon" onClick={showDrawer}>
        <BurgerMenuIcon />
      </div>
      <div className="addon" onClick={handleStartNewConversation}>
        <CreateIcon />
      </div>
    </div>
  );
};