import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {NextUIProvider} from "@nextui-org/react";
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <GoogleOAuthProvider clientId="281163685575-bsalvq26n77e8kcvahul393vd5rlps04.apps.googleusercontent.com">
  <NextUIProvider>
    <App />
  </NextUIProvider>
  </GoogleOAuthProvider>


  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
