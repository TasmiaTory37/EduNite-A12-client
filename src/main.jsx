import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// ✅ Correctly load env key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// TanStack Query
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
