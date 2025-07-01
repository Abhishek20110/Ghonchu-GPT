'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Zap, Shield, Sparkles, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="float-animation">
              <div className="relative inline-block">
                <Heart className="w-20 h-20 mx-auto text-amber-400 pulse-glow wag-animation" />
                <PawPrint className="w-8 h-8 text-amber-300 absolute -bottom-2 -right-2 paw-bounce" />
              </div>
            </div>
            
            <div className="space-y-4 slide-in">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Ghonchu GPT
              </h1>
              <div className="flex items-center justify-center space-x-2 text-2xl md:text-3xl text-amber-200">
                <span>🐕</span>
                <span className="font-semibold">Your Loyal Golden AI Companion</span>
                <span>🐾</span>
              </div>
              <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
                Meet Ghonchu, your faithful AI companion inspired by the loyalty and warmth of a Golden Retriever. 
                Experience conversations filled with intelligence, care, and that special golden touch.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 golden-glow">
                  Start Chatting with Ghonchu
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link href="/docs">
                <Button variant="outline" size="lg" className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
                  View API Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Why Choose Ghonchu GPT? 🐾
            </h2>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Discover the features that make Ghonchu your perfect AI companion, 
              with all the loyalty and intelligence of a Golden Retriever
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast ⚡',
                description: 'Just like Ghonchu fetching a ball, our AI responds instantly with lightning-fast processing and eager-to-help attitude.',
                emoji: '🎾'
              },
              {
                icon: Shield,
                title: 'Loyal & Trustworthy 🛡️',
                description: 'With the unwavering loyalty of a Golden Retriever, your conversations are protected with enterprise-grade security.',
                emoji: '🤝'
              },
              {
                icon: Sparkles,
                title: 'Intelligent & Caring ✨',
                description: 'Combining Golden Retriever warmth with advanced AI intelligence for responses that truly understand and care.',
                emoji: '💝'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-8 hover:bg-amber-100/15 transition-all duration-500 transform hover:scale-105 group">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{feature.emoji}</div>
                  <feature.icon className="w-12 h-12 text-amber-400 mx-auto group-hover:text-amber-300 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white text-center">{feature.title}</h3>
                <p className="text-amber-100 leading-relaxed text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 text-center">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              🐕 About Our Golden Inspiration
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-amber-100">
              <div className="space-y-2">
                <div className="text-2xl">🎾</div>
                <p><strong>Playful:</strong> Just like Ghonchu loves to play, our AI makes conversations fun and engaging</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🤗</div>
                <p><strong>Friendly:</strong> Golden Retrievers are known for their warm nature - so is our AI</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🧠</div>
                <p><strong>Smart:</strong> Combining canine intuition with artificial intelligence</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">💛</div>
                <p><strong>Loyal:</strong> Always here when you need help, just like your faithful companion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 golden-glow">
            <div className="text-6xl mb-6">🐕💫</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Ready to Meet Ghonchu?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered the joy of having an AI companion 
              with the heart of a Golden Retriever. Ghonchu is waiting to meet you! 🐾
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-5 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Chat with Ghonchu Now! 🎾
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-10 py-5 rounded-xl text-xl font-semibold transition-all duration-300">
                  Explore API Docs 📚
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}