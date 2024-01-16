import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.css';

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice',
  description: 'Keep your invoices in one place!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={leagueSpartan.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
