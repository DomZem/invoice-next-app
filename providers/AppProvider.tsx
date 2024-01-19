'use client';

import Toaster from '@/components/UI/Toaster';
import QueryProvider from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import UserProvider from './UserProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <QueryProvider>
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  );
}
