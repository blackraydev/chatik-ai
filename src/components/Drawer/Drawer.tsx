import { useConversationsScope, useDrawerVisibilityScope } from '../../scopes';
import './Drawer.css';

export const Drawer = () => {
  const { conversations, chooseConversation } = useConversationsScope();
  const { isDrawerVisible, hideDrawer } = useDrawerVisibilityScope();

  const overlayClassName = isDrawerVisible ? 'overlay visible' : 'overlay';
  const drawerClassName = isDrawerVisible ? 'drawer visible' : 'drawer';

  const handleConversationClick = (conversationId: string) => {
    chooseConversation(conversationId);
    hideDrawer();
  };

  return (
    <div className={overlayClassName} onClick={hideDrawer}>
      <div className={drawerClassName} onClick={(e) => e.stopPropagation()}>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="conversation"
            onClick={() => handleConversationClick(conversation.id)}
          >
            <p className="conversation-title">{conversation.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
