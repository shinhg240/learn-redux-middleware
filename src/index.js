import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
// import { thunk } from 'redux-thunk';
// > Redux Toolkit의 getDefaultMiddleware() 안에 이미 redux-thunk 포함

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서만 DevTools 활성화
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

window.store = store;

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
