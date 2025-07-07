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
  title: 'Ghonchu GPT – Talk to a Fun AI Dog 🐶',
  description:
    'Ghonchu GPT is your witty, pet-inspired AI chatbot assistant. Built in India, powered by GPT, and filled with playful personality. Ask Ghonchu anything!',
  keywords: [
    'Ghonchu GPT',
    'AI chatbot India',
    'funny GPT assistant',
    'golden retriever AI',
    'talk to AI dog',
    'chatbot with personality',
    'Indian AI project',
    'free chatbot India',
    'talking dog AI',
    'Ghonchu AI bot',
    'GPT dog companion',
    'cute chatbot free',
    'fun AI assistant',
    'doggpt',
    'GPT for fun',
    'pet themed AI',
    'interactive dog chatbot',
    'AI by Abhishek Dey',
    'dog GPT bot',
    'virtual pet chatbot',
    'GPT bot India',
    'chatbot for pet lovers',
    'friendly GPT chat',
    'AI dog jokes',
    'chat with golden retriever AI',
    'dog assistant GPT',
    'free chat gpt website',
    'Made in India AI',
  ],
  openGraph: {
    title: 'Ghonchu GPT – Talk to a Fun AI Dog 🐶',
    description:
      'Chat with Ghonchu – your golden retriever-inspired AI chatbot. Smart, witty, and always ready to talk. Try it free!',
    url: 'https://ghonchu-gpt.vercel.app',
    siteName: 'Ghonchu GPT',
    type: 'website',
    images: [
      {
        url: 'https://ghonchu-gpt.vercel.app/ghonchu-preview.png',
        width: 1200,
        height: 630,
        alt: 'Ghonchu GPT AI Chatbot Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghonchu GPT – Talk to a Fun AI Dog 🐶',
    description: 'Chat with Ghonchu – your witty golden retriever-powered AI chatbot, made in India by Abhishek Dey.',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="RqYi4DCt2l34hrw1-RiusGqRkRNEswFtr1YFEiONMlM" />
        <meta name="language" content="en-IN" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <link rel="canonical" href="https://ghonchu-gpt.vercel.app/" />
      <link rel="alternate" hrefLang="en-in" href="https://ghonchu-gpt.vercel.app/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Ghonchu GPT",
              url: "https://ghonchu-gpt.vercel.app",
              applicationCategory: "Chatbot",
              operatingSystem: "All",
              description:
                "Ghonchu GPT is an interactive, dog-inspired AI chatbot assistant developed by Indian developer Abhishek Dey. Talk to Ghonchu for fun and helpful conversations.",
              creator: {
                "@type": "Person",
                name: "Abhishek Dey",
                nationality: "Indian",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://ghonchu-gpt.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
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
