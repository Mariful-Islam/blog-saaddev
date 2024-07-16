import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='116502411272-3dbc9g01q2rjr0flvt8o3hcliudu4krh.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
