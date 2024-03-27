import { useMemo } from 'react';
import { useConversationsScope, useDrawerVisibilityScope } from '../../../scopes';
import { getConversationsByPeriods } from '../../../utils';
import { periodLabels } from '../../../consts';
import { PeriodType } from '../../../types';
import './ConversationsList.css';

export const ConversationsList = () => {
  const { conversations, conversationId, chooseConversation } = useConversationsScope();
  const { hideDrawer } = useDrawerVisibilityScope();

  const conversationsByPeriods = useMemo(
    () => getConversationsByPeriods(conversations),
    [conversations],
  );

  const handleConversationClick = (conversationId: string) => {
    chooseConversation(conversationId);
    hideDrawer();
  };

  return (
    <div className="conversations-wrapper">
      {Object.entries(conversationsByPeriods).map(
        ([period, conversations]) =>
          conversations.length > 0 && (
            <div key={period} className="conversations-period">
              <p className="period-label">{periodLabels[period as PeriodType]}</p>
              {conversations
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
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
