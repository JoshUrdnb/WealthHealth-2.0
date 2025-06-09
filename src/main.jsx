import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EmployeeProvider } from './context/EmployeeProvider.jsx'
import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </StrictMode>,
)
