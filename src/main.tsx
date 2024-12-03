import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { client } from './graphql/apolloClient';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster position="top-right" />
    </ApolloProvider>
  </StrictMode>
);