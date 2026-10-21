import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { installStore } from './pwa/installStore'
import { registerServiceWorker } from './pwa/register'

const cleanupInstallEvents = installStore.initialize(window)
if (import.meta.hot) import.meta.hot.dispose(cleanupInstallEvents)
registerServiceWorker()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
