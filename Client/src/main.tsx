import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";

import App from './App.tsx';
import { store } from "./types/store.ts";

// import { rootReducer } from "./reducer/rootReducer.tsx";

// const store = configureStore({ reducer: rootReducer });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    <Toaster/>
    </Provider>
  </StrictMode>
);
