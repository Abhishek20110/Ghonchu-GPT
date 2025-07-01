'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { signIn, signUp } from '@/lib/auth';
import { Heart, PawPrint, Mail, Lock, User, Phone, Building } from 'lucide-react';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { data, error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else if (data.user) {
          setSuccess('Welcome back! 🐕');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        }
      } else {
        const { data, error } = await signUp(name, email, password, phone, company);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created successfully! You can now sign in. 🎾');
          setTimeout(() => {
            setIsLogin(true);
            setSuccess('');
          }, 2000);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Heart className="w-12 h-12 text-amber-400 wag-animation" />
            <PawPrint className="w-8 h-8 text-amber-300 paw-bounce" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back! 🐕' : 'Join Ghonchu GPT! 🐾'}
          </h1>
          <p className="text-amber-100">
            {isLogin
              ? 'Sign in to access your Ghonchu GPT dashboard'
              : 'Create your account to start building with Ghonchu'}
          </p>
        </div>

        {/* Demo Credentials */}
        {/*   <Card className="glass-card p-4 bg-amber-100/5 border-amber-200/10">
          <div className="text-center space-y-2">
            <p className="text-amber-200 text-sm font-semibold">🎾 Demo Credentials</p>
            <div className="text-xs text-amber-300 space-y-1">
              <p><strong>Email:</strong> any@email.com</p>
              <p><strong>Password:</strong> password123</p>
            </div>
          </div>
        </Card> */}

        {/* Form */}
        <Card className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-amber-200 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Name</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="bg-amber-100/10 border-amber-200/20 text-white placeholder-amber-300 focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-amber-200 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone</span>
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 12345 67890"
                    required
                    className="bg-amber-100/10 border-amber-200/20 text-white placeholder-amber-300 focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-amber-200 flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Company</span>
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your Company Name"
                    required
                    className="bg-amber-100/10 border-amber-200/20 text-white placeholder-amber-300 focus:border-amber-500/50"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-200 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-amber-100/10 border-amber-200/20 text-white placeholder-amber-300 focus:border-amber-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-200 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-amber-100/10 border-amber-200/20 text-white placeholder-amber-300 focus:border-amber-500/50"
              />
            </div>

            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 text-red-300">
                {error}
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-500/10 border-green-500/20 text-green-300">
                {success}
              </Alert>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{isLogin ? 'Sign In 🐕' : 'Create Account 🐾'}</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-300 hover:text-amber-200 transition-colors duration-200"
            >
              {isLogin
                ? "Don't have an account? Sign up 🎾"
                : 'Already have an account? Sign in 🐕'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
