import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


import './index.css';
import App from './App';
import store from './store/store.js'
import GeneralLayoutContext from './context/GeneralLayoutContext.jsx';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 300000 //5 mins
        // refetchOnMount: false,
        // staleTime: Infinity // can also be a number in millisecond
      },
    },
  })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <GeneralLayoutContext>
              <App />
            </GeneralLayoutContext>
          </Provider>
        </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
