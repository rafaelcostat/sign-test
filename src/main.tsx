import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ActivitiesProvider } from './contexts/ActivityContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ActivitiesProvider>
      <App />
    </ActivitiesProvider>
  </React.StrictMode>,
)
