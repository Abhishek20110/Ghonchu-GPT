'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, PawPrint, LogOut, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { signOut } from '@/lib/auth';
import { getUserApps, App } from '@/lib/apps';
import AppTable from '@/components/dashboard/app-table';
import CreateAppForm from '@/components/dashboard/create-app-form';
import { toast } from 'sonner';

import { getAuthToken } from '@/lib/auth';

export default function DashboardPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {

    console.log('token on dashboard:', getAuthToken());
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const fetchApps = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getUserApps(user.id);

    if (error) {
      toast.error('Failed to fetch apps');
    } else {
      setApps(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchApps();
    }
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully! 🐾');
      router.push('/');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Heart className="w-12 h-12 text-amber-400 mx-auto wag-animation" />
          <p className="text-amber-200">Loading your dashboard... 🐕</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const activeApps = apps.filter(app => app.is_active).length;
  const approvedApps = apps.filter(app => app.is_admin_approved).length;
  const totalApps = apps.length;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Heart className="w-10 h-10 text-amber-400 wag-animation" />
              <PawPrint className="w-6 h-6 text-amber-300 paw-bounce" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Dashboard 🐕
              </h1>
              <p className="text-amber-200">Welcome back, {user.name}!</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CreateAppForm onAppCreated={fetchApps} />
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-100/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-600/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalApps}</p>
                <p className="text-amber-200 text-sm">Total Apps</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Settings className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeApps}</p>
                <p className="text-amber-200 text-sm">Active Apps</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Heart className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{approvedApps}</p>
                <p className="text-amber-200 text-sm">Approved Apps</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Apps Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span>🐾</span>
              <span>Your Apps</span>
            </h2>
          </div>

          {loading ? (
            <Card className="glass-card p-8 text-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
                <p className="text-amber-200">Loading your apps... 🐕</p>
              </div>
            </Card>
          ) : (
            <AppTable apps={apps} onAppUpdate={fetchApps} />
          )}
        </div>
      </div>
    </div>
  );
}