import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/themeprovide.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BookmarkProvider } from './components/bookmarkProvider.tsx'
import { ToastProvider } from './toast/toastProvider.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  

  <StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <ToastProvider>
    <BookmarkProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </BookmarkProvider>
    </ToastProvider>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
