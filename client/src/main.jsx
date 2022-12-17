import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { UserContextProvider } from './context/AuthContext'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
