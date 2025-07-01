import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ghonchu GPT - AI Assistant',
  description: 'Your intelligent AI companion for conversations and assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="RqYi4DCt2l34hrw1-RiusGqRkRNEswFtr1YFEiONMlM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(251, 191, 36, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  );
}