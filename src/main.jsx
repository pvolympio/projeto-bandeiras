import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/newsreader'
import '@fontsource-variable/manrope'
import App from './App'
import './index.css'
import { SoundProvider } from './contexts/SoundContext'
import { HelmetProvider } from 'react-helmet-async'
import { registerServiceWorker } from './pwa/registerServiceWorker'

registerServiceWorker()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </HelmetProvider>
  </React.StrictMode>
)
