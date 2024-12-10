import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { ChromeExtensionSyncedStorage } from './utils/ChromeExtensionSyncedStorage.tsx';
import { Hub } from 'aws-amplify/utils';

Amplify.configure(outputs);
const existingConfig = Amplify.getConfig();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(3000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Add existing resource to the existing configuration.
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      Dassie: {
        endpoint: import.meta.env.DEV
          ? 'http://127.0.0.1:3000'
          : 'https://t6pwh7x1a9.execute-api.eu-west-1.amazonaws.com/prod',
        region: 'eu-west-1', // Optional
      },
    },
  },
});
const authStorage = new ChromeExtensionSyncedStorage();
cognitoUserPoolsTokenProvider.setKeyValueStorage(authStorage);

Hub.listen('auth', ({ payload }) => {
  console.debug('Hub event', payload);
  window.postMessage({ type: 'auth', event: payload.event, payload: payload }, '*');
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
