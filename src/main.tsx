import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import App from './App.tsx';
import { ScopeComposer } from './components';
import './index.css';

WebApp.ready();
WebApp.expand();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ScopeComposer>
        <App />
      </ScopeComposer>
    </QueryClientProvider>
  </React.StrictMode>,
);
