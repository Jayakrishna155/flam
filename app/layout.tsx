import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/layout/navbar';
import { BookmarksProvider } from '@/context/bookmarks-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HR Performance Dashboard',
  description: 'Track employee performance, manage bookmarks, and view detailed insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BookmarksProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </BookmarksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}