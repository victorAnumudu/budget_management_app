import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import store from './store/store.js'
import GeneralLayoutContext from './context/GeneralLayoutContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GeneralLayoutContext>
          <App />
        </GeneralLayoutContext>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
