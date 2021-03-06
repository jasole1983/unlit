import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ModalProvider } from './context/Modal';
import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';
import { FlowerModalProvider } from './context/NewFlowerModal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <FlowerModalProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </FlowerModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
