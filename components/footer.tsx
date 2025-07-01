'use client';

import Link from 'next/link';
import { Heart, PawPrint, Mail, Github, Twitter, MessageCircle, BookOpen, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const shouldHideFooter = pathname.startsWith('/chat');
  if (shouldHideFooter) {
    return null; // Hide footer on chat page
  }

  return (
    <footer className="relative mt-20">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600"></div>

      <div className="glass-card border-t border-amber-200/20 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Heart className="w-8 h-8 text-amber-400 wag-animation" />
                  <PawPrint className="w-4 h-4 text-amber-300 absolute -bottom-1 -right-1 paw-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Ghonchu GPT
                  </h3>
                  <p className="text-xs text-amber-300/70">🐕 Your Golden AI Companion</p>
                </div>
              </div>
              <p className="text-amber-200 text-sm leading-relaxed">
                Experience the loyalty and intelligence of a Golden Retriever in AI form.
                Ghonchu is here to help with all your text generation, rewriting, and translation needs.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center hover:bg-amber-600/30 transition-colors cursor-pointer">
                  <Twitter className="w-4 h-4 text-amber-400" />
                </div>
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center hover:bg-amber-600/30 transition-colors cursor-pointer">
                  <Github className="w-4 h-4 text-amber-400" />
                </div>
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center hover:bg-amber-600/30 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center space-x-2">
                <span>🎾</span>
                <span>Quick Links</span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <span>🏠</span>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <MessageCircle className="w-3 h-3" />
                    <span>Chat with Ghonchu</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <BookOpen className="w-3 h-3" />
                    <span>API Documentation</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <Settings className="w-3 h-3" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center space-x-2">
                <span>✨</span>
                <span>Features</span>
              </h4>
              <ul className="space-y-2">
                <li className="text-amber-200 text-sm flex items-center space-x-2">
                  <span>🤖</span>
                  <span>AI Text Generation</span>
                </li>
                <li className="text-amber-200 text-sm flex items-center space-x-2">
                  <span>🔄</span>
                  <span>Content Rewriting</span>
                </li>
                <li className="text-amber-200 text-sm flex items-center space-x-2">
                  <span>🌍</span>
                  <span>Multi-language Translation</span>
                </li>
                <li className="text-amber-200 text-sm flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Lightning Fast API</span>
                </li>
                <li className="text-amber-200 text-sm flex items-center space-x-2">
                  <span>🛡️</span>
                  <span>Secure & Reliable</span>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center space-x-2">
                <span>🐕</span>
                <span>Support</span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <span>📧</span>
                    <span>Contact Support</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <span>💬</span>
                    <span>Community Forum</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <span>📚</span>
                    <span>Help Center</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <span>🔧</span>
                    <span>Status Page</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors text-sm flex items-center space-x-2">
                    <span>📋</span>
                    <span>Terms of Service</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-amber-200/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-amber-200 text-sm">
                  © {currentYear} Ghonchu GPT. Made with{' '}
                  <Heart className="w-4 h-4 inline text-red-400 pulse-glow" /> and lots of{' '}
                  <span className="text-amber-400">🎾</span> by{' '}
                  <span className="text-amber-300 font-medium">Abhishek Dey</span>
                </p>
              </div>


              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Cookie Policy
                </a>
                <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Legal
                </a>
              </div>
            </div>

            {/* Fun Golden Retriever Quote */}
            <div className="mt-6 text-center">
              <div className="glass-card p-4 bg-amber-100/5 border border-amber-200/10 inline-block">
                <p className="text-amber-300 text-sm italic">
                  "A dog is the only thing on earth that loves you more than you love yourself."
                  <span className="block mt-1 text-amber-400 text-xs">- Just like Ghonchu loves helping you! 🐕💛</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}