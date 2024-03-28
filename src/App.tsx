import { Fragment } from 'react';
import { Conversation, Drawer, Header, Interaction, Spinner } from './components';
import { useUserScope } from './scopes';
import './App.css';

function App() {
  const { user, isUserLoading, isUserError } = useUserScope();

  const renderContent = () => {
    if (isUserError) {
      return (
        <div className="content-wrapper">
          <p className="error-label">Server is unavailable</p>
        </div>
      );
    }
    if (isUserLoading || !user) {
      return (
        <div className="content-wrapper">
          <Spinner size="big" />
        </div>
      );
    }

    return (
      <Fragment>
        <Header />
        <Drawer />
        <Conversation />
        <Interaction />
      </Fragment>
    );
  };

  return <div className="app">{renderContent()}</div>;
}

export default App;
