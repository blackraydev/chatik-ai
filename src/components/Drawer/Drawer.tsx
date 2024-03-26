import { BotIcon, CreateIcon } from '../../icons';
import { useConversationsScope, useDrawerVisibilityScope, useMessagesScope } from '../../scopes';
import { ConversationType, PeriodType } from '../../types';
import { Spinner } from '../Spinner';
import './Drawer.css';

const periodLabels: Record<PeriodType, string> = {
  today: 'Today',
  week: 'Last week',
  month: 'Last month',
  year: 'Last year',
};

export const Drawer = () => {
  const {
    conversationId,
    conversations,
    chooseConversation,
    startNewConversation,
    isConversationsLoading,
  } = useConversationsScope();
  const { messages, clearMessages } = useMessagesScope();
  const { isDrawerVisible, hideDrawer } = useDrawerVisibilityScope();

  const overlayClassName = isDrawerVisible ? 'overlay visible' : 'overlay';
  const drawerClassName = isDrawerVisible ? 'drawer visible' : 'drawer';

  const handleConversationClick = (conversationId: string) => {
    chooseConversation(conversationId);
    hideDrawer();
  };

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
        <div className="content-wrapper">
          <Spinner size="medium" />
        </div>
      );
    }
    if (!conversations.length) {
      return (
        <div className="content-wrapper">
          <p>No chats yet</p>
        </div>
      );
    }

    const conversationsByPeriods = conversations.reduce(
      (acc, conversation) => {
        const currentDate = new Date();
        const date = new Date(Number(conversation.updatedAt));
        const diff = Math.abs(currentDate.getTime() - date.getTime());

        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        if (diffDays <= 1) {
          acc.today.push(conversation);
        } else if (diffDays <= 7) {
          acc.week.push(conversation);
        } else if (diffDays <= 31) {
          acc.month.push(conversation);
        } else {
          acc.year.push(conversation);
        }

        return acc;
      },
      {
        today: [],
        week: [],
        month: [],
        year: [],
      } as Record<PeriodType, ConversationType[]>,
    );

    return (
      <div className="conversations-wrapper">
        {Object.entries(conversationsByPeriods).map(
          ([period, conversations]) =>
            conversations.length > 0 && (
              <div key={period} className="conversations-period">
                <p className="period-label">{periodLabels[period as PeriodType]}</p>
                {conversations
                  .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
                  .map((conversation) => {
                    const conversationClassName =
                      conversation.id === conversationId ? 'conversation active' : 'conversation';

                    return (
                      <div
                        key={conversation.id}
                        className={conversationClassName}
                        onClick={() => handleConversationClick(conversation.id)}
                      >
                        <p className="conversation-title">{conversation.title}</p>
                      </div>
                    );
                  })}
              </div>
            ),
        )}
      </div>
    );
  };

  return (
    <div className={overlayClassName} onClick={hideDrawer}>
      <div className={drawerClassName} onClick={(e) => e.stopPropagation()}>
        <div className="new-chat" onClick={handleStartNewConversation}>
          <div className="action">
            <BotIcon size={24} />
            <p>New chat</p>
          </div>
          <CreateIcon />
        </div>
        {renderConversations()}
      </div>
    </div>
  );
};
