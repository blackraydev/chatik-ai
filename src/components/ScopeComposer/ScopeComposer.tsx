import { ConversationsScope, DrawerVisibilityScope, MessagesScope, UserScope } from '../../scopes';

type ScopeComposerProps = {
  children: React.ReactNode;
};

export const ScopeComposer = ({ children }: ScopeComposerProps) => {
  return (
    <UserScope>
      <ConversationsScope>
        <MessagesScope>
          <DrawerVisibilityScope>{children}</DrawerVisibilityScope>
        </MessagesScope>
      </ConversationsScope>
    </UserScope>
  );
};
