import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';

import { ThemeProvider } from './ThemeProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider accentColor="blue" grayColor="gray" scaling="100%" radius="medium" appearance="dark">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
