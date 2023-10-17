import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { createStore } from './store';
import { UserService } from './api/auth/UserService';
import { YandexAPIRepository } from './repository/YandexAPIRepository';
import './assets/styles/index.scss';

const initialState = window.initialState;

delete window.initialState;

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider
      store={createStore(
        new UserService(new YandexAPIRepository()),
        initialState,
      )}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
