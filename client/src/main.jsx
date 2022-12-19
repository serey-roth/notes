import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <Toaster />
                    <App />
                </AuthContextProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
