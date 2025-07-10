import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

// 👇 Import TanStack Query Client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 👇 Create a client instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
