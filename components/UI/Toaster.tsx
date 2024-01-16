'use client';

import { useTheme } from 'next-themes';
import { Toaster as ReactToaster } from 'react-hot-toast';

export default function Toaster() {
  const { theme } = useTheme();

  return (
    <ReactToaster
      toastOptions={{
        style: {
          backgroundColor: theme === 'dark' ? '#1e2139' : '#ffffff',
          color: theme === 'dark' ? '#dfe3fa' : '#0c0e16',
          fontSize: '15px',
          fontWeight: 500,
          maxWidth: '400px',
        },
      }}
    />
  );
}
