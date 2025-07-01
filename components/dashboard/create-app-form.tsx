'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Sparkles, RefreshCw, Languages } from 'lucide-react';
import { createApp } from '@/lib/apps';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { getAuthToken } from '@/lib/auth';

interface CreateAppFormProps {
  onAppCreated: () => void;
}

export default function CreateAppForm({ onAppCreated }: CreateAppFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  console.log('token in create app form:', getAuthToken());
  const [formData, setFormData] = useState({
    name: '',
    enableGeneration: false,
    enableRewrite: false,
    enableTranslate: false,
  });
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!user || !token) return;

    setLoading(true);

    try {
      const { data, error } = await createApp({
        name: formData.name,
        enableGeneration: formData.enableGeneration,
        enableRewrite: formData.enableRewrite,
        enableTranslate: formData.enableTranslate,
        token, // ✅ Pass token
      });

      if (error) {
        toast.error('Failed to create app');
      } else {
        toast.success('App created successfully! 🐕 Waiting for admin approval...');
        setFormData({
          name: '',
          enableGeneration: false,
          enableRewrite: false,
          enableTranslate: false,
        });
        setOpen(false);
        onAppCreated();
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Create New App 🐾
        </Button>
      </DialogTrigger>

      <DialogContent className="glass-card border-amber-200/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center space-x-2">
            <span>🐕</span>
            <span>Create New App</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="appName" className="text-amber-200">
              App Name *
            </Label>
            <Input
              id="appName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="My Awesome App"
              required
              className="bg-amber-100/10 border-amber-200/20 text-white placeholder-amber-300 focus:border-amber-500/50"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-amber-200 text-base font-semibold">
              Features 🎾
            </Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-100/5 border border-amber-200/10">
                <Checkbox
                  id="generation"
                  checked={formData.enableGeneration}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, enableGeneration: checked as boolean }))
                  }
                  className="border-amber-500/50 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <Label htmlFor="generation" className="text-white cursor-pointer">
                    Enable Generation
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-100/5 border border-amber-200/10">
                <Checkbox
                  id="rewrite"
                  checked={formData.enableRewrite}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, enableRewrite: checked as boolean }))
                  }
                  className="border-amber-500/50 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <Label htmlFor="rewrite" className="text-white cursor-pointer">
                    Enable Rewrite
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-100/5 border border-amber-200/10">
                <Checkbox
                  id="translate"
                  checked={formData.enableTranslate}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, enableTranslate: checked as boolean }))
                  }
                  className="border-amber-500/50 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <div className="flex items-center space-x-2">
                  <Languages className="w-4 h-4 text-amber-400" />
                  <Label htmlFor="translate" className="text-white cursor-pointer">
                    Enable Translation
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-100/10 p-4 rounded-lg border border-amber-200/20">
            <p className="text-amber-200 text-sm">
              <span className="font-semibold">🔑 Note:</span> App ID and App Secret will be automatically generated upon creation.
              Your app will need admin approval before it becomes active.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-amber-500/30 text-amber-300 hover:bg-amber-100/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create App 🐕'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}