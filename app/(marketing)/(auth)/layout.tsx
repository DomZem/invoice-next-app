import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      <h1>Auth layout</h1>
      {children}
    </main>
  );
}
