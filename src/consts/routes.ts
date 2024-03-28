import { ComponentType } from 'react';
import { ConversationPage, UpgradePlanPage } from '../pages';

interface Route {
  path: string;
  Component: ComponentType;
}

export const routes: Route[] = [
  { path: '/upgrade-plan', Component: UpgradePlanPage },
  { path: '/:conversationId', Component: ConversationPage },
  { path: '/', Component: ConversationPage },
];
