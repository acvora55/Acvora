import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain="dev-2yyetaasnnhiyln6.us.auth0.com"
  clientId="xlBRDdIEWl3LSLfE7CwT3LWUDiTOPcmi"
  redirectUri={window.location.origin}
>
  <React.StrictMode>
        <GoogleOAuthProvider clientId="446772856421-cd8cdk5msbgogm2fcl951etavvf2lr1s.apps.googleusercontent.com"><App /></GoogleOAuthProvider>
  </React.StrictMode>
  </Auth0Provider>
);

