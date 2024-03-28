import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App.tsx';
import { ScopeComposer } from './components';
import './index.css';

WebApp.ready();
WebApp.expand();

const queryClient = new QueryClient();
const manifestUrl = new URL('tonconnect-manifest.json', window.location.href).toString();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <ScopeComposer>
          <App />
        </ScopeComposer>
      </TonConnectUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
