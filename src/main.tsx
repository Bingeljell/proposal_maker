import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProposalProvider } from './context/ProposalContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProposalProvider>
        <App />
      </ProposalProvider>
    </AuthProvider>
  </StrictMode>,
)
