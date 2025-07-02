import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ghonchu GPT – Your AI Assistant 🐾',
  description: 'Ghonchu GPT is your playful AI chatbot assistant for smart, witty, and helpful conversations. Ask Ghonchu anything!',
  keywords: [
  'Ghonchu GPT',
  'AI chatbot',
  'funny assistant',
  'Ghonchu AI',
  'GPT dog bot',
  'chat with Ghonchu',
  'Ghonchu',
  'gochu gpt',
  'free api',
  'chat gpt',
  'AI',
  'new ai',
  'fun ai',
  'dog gpt',
  'Ghonchu Bot',
  'GPT-powered assistant',
  'pet-themed AI',
  'talking dog AI',
  'golden retriever bot',
  'witty GPT chatbot',
  'cute AI chatbot',
  'AI dog companion',
  'AI with personality',
  'Ghonchu assistant',
  'Ghonchu the dog',
  'dog chatbot',
  'GPT chat buddy',
  'hilarious GPT bot',
  'chatbot API',
  'fun GPT responses',
  'chatbot with paw',
  'chatbot for websites',
  'AI dog',
  'dog voice chatbot',
  'talk to GPT',
  'GPT for fun',
  'chatbot for fun',
  'talking pet AI',
  'AI with emotions',
  'lighthearted chatbot',
  'developer API GPT',
  'fun AI tool',
  'free GPT chat',
  'chatbot friend',
  'AI pet bot',
  'dog GPT API',
  'best free AI chatbot',
  'funny chat gpt bot',
  'gpt chatbot online',
  'chatbot that jokes',
  'talk to a dog bot',
  'gpt chatbot for fun',
  'free chat gpt website',
  'ai bot with personality',
  'dog themed ai assistant',
  'cute ai assistant',
  'friendly ai chatbot',
  'chatbot like gpt',
  'best chatbot to talk to',
  'interactive ai bot',
  'realistic ai chat',
  'ai dog friend',
  'chat with funny ai',
  'ask ai questions free',
  'ai talking dog online',
  'dog ai chat',
  'doggpt',
  'ghonchu gpt free chat',
  'fun ai chatbot online',
  'ai dog jokes',
  'ai dog assistant gpt' ,
  'chat gpt pro free' ,
  'AI by Abhishek Dey' ,
  'Indian AI',
],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ghonchu GPT",
              "url": "https://ghonchu-gpt.vercel.app",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
          <Analytics />
          <SpeedInsights />
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
