import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import RecruiterContextProvider from './context/RecruiterContext.jsx';
import CandidateContextProvider from './context/CandidateContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CandidateContextProvider>
        <RecruiterContextProvider>
          <App />
        </RecruiterContextProvider>
      </CandidateContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
