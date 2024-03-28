import { Fragment, useMemo } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { createNavigator, useNavigatorIntegration } from '@tma.js/react-router-integration';
import { routes } from './consts';
import { Drawer, Header, Spinner } from './components';
import { useUserScope } from './scopes';
import './App.css';

function App() {
  const tmaNavigator = useMemo(createNavigator, []);
  const [location, navigator] = useNavigatorIntegration(tmaNavigator);
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
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Fragment>
    );
  };

  return (
    <Router location={location} navigator={navigator}>
      <div className="app">{renderContent()}</div>;
    </Router>
  );
}

export default App;
