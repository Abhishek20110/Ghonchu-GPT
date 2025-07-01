'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, MessageCircle, Settings, Home, User, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/docs', label: 'API Docs', icon: BookOpen },
    ...(user ? [
      { href: '/dashboard', label: 'Dashboard', icon: Settings },
    ] : [
      { href: '/login', label: 'Login', icon: User },
    ]),
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-amber-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 wag-animation" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Ghonchu GPT
              </span>
              <span className="text-xs text-amber-300/70 -mt-1">🐕 Your Golden AI Companion</span>
            </div>
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 golden-glow'
                      : 'text-amber-200 hover:text-white hover:bg-amber-100/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}