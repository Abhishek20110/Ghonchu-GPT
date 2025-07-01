import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ghonchu GPT – Your AI Assistant 🐾',
  description: 'Ghonchu GPT is your playful AI chatbot assistant for smart, witty, and helpful conversations. Ask Ghonchu anything!',
  keywords: ['Ghonchu GPT', 'AI chatbot', 'funny assistant', 'Ghonchu AI', 'GPT dog bot', 'chat with Ghonchu'],
  openGraph: {
    title: 'Ghonchu GPT – Your AI Assistant 🐾',
    description: 'Ghonchu GPT is your playful AI chatbot assistant for smart, witty, and helpful conversations.',
    url: 'https://ghonchu-gpt.vercel.app',
    siteName: 'Ghonchu GPT',
    type: 'website',
    images: [
      {
        url: 'https://ghonchu-gpt.vercel.app/ghonchu-preview.png',
        width: 1200,
        height: 630,
        alt: 'Ghonchu GPT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghonchu GPT – Your AI Assistant 🐾',
    description: 'Chat with Ghonchu, your golden retriever-powered AI chatbot!',
    images: ['https://ghonchu-gpt.vercel.app/ghonchu-preview.png'],
  },
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
        <link rel="canonical" href="https://ghonchu-gpt.vercel.app/" />
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