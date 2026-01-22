import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProposalProvider } from './context/ProposalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProposalProvider>
      <App />
    </ProposalProvider>
  </StrictMode>,
)
