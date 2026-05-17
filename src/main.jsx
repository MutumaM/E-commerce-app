import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { NuShopProvider } from './context/NuShopContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NuShopProvider>
        <App />
      </NuShopProvider>
    </BrowserRouter>
  </React.StrictMode>
)
