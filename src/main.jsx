import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'

// react helmet(dynamic title) provider
import { HelmetProvider } from 'react-helmet-async';
// TanStack Query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AuthProvider from './Providers/AuthProvider'

// Create a client for Tanstack query
const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* for dynamic title: react helmet */}
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
