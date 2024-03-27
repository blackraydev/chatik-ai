import { ConversationType, PeriodType } from '../types';

export const getConversationsByPeriods = (conversations: ConversationType[]) => {
  return conversations.reduce(
    (acc, conversation) => {
      const currentDate = new Date();
      const date = new Date(conversation.updatedAt);
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
};
