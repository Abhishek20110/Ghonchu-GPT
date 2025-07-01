'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Copy, Trash2, Eye, EyeOff, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { getAuthToken } from '@/lib/auth';

interface App {
  _id: string;
  name: string;
  appkey: string;
  appsecret: string;
  is_active: boolean;
  is_admin_approved: boolean;
  enable_generation: boolean;
  enable_rewrite: boolean;
  enable_translate: boolean;
  createdAt: string;
  updatedAt: string;
  is_del: boolean;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  __v: number;
}


interface AppTableProps {
  apps: App[];
  onAppUpdate: () => void;
}

export default function AppTable({ apps, onAppUpdate }: AppTableProps) {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const toggleSecret = (appId: string) => {
    setShowSecrets(prev => ({ ...prev, [appId]: !prev[appId] }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard! 🐾`);
  };

  const handleStatusToggle = async (appId: string, currentStatus: boolean) => {
    setLoadingStates(prev => ({ ...prev, [appId]: true }));
    try {
      const res = await fetch(`${apiurl}/api/app/change-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`  // Assuming you store token in localStorage
        },
        body: JSON.stringify({
          is_active: !currentStatus,
          _id: appId
        })
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || 'Failed');
      toast.success(`App ${!currentStatus ? 'activated' : 'deactivated'} successfully! 🐕`);
      onAppUpdate();
    } catch (err: any) {
      toast.error(err.message || 'Error updating status');
    }
    setLoadingStates(prev => ({ ...prev, [appId]: false }));
  };

  const handleDelete = async (appId: string) => {
    setLoadingStates(prev => ({ ...prev, [appId]: true }));
    try {
      const res = await fetch(`/api/app/delete/${appId}`, {
        method: 'DELETE',

      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || 'Failed');
      toast.success('App deleted successfully! 🐾');
      onAppUpdate();
    } catch (err: any) {
      toast.error(err.message || 'Error deleting app');
    }
    setLoadingStates(prev => ({ ...prev, [appId]: false }));
  };

  const getStatusBadge = (isActive: boolean) =>
    isActive ? (
      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );

  const getApprovalBadge = (approved: boolean) =>
    approved ? (
      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
        <CheckCircle className="w-3 h-3 mr-1" />
        Approved
      </Badge>
    ) : (
      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    );

  if (apps.length === 0) {
    return (
      <Card className="glass-card p-8 text-center">
        <div className="text-6xl mb-4">🐕</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Apps Yet!</h3>
        <p className="text-amber-200">Create your first app to get started with Ghonchu GPT API</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {apps.map(app => (
        <Card key={app._id} className="glass-card p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* App Info */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold text-white mb-2">{app.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {app.enable_generation && <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-300">Generation</Badge>}
                {app.enable_rewrite && <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-300">Rewrite</Badge>}
                {app.enable_translate && <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-300">Translate</Badge>}
              </div>
            </div>

            {/* App ID */}
            <div className="lg:col-span-2">
              <p className="text-xs text-amber-300">App ID</p>
              <div className="flex items-center space-x-2 overflow-hidden">
                <code className="text-xs bg-black/20 px-2 py-1 rounded text-green-400 font-mono">
                  {app.appkey.substring(0, 12)}...
                </code>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(app.appkey, 'App ID')} className="h-6 w-6 p-0 text-amber-300 hover:text-white">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* App Secret */}
            <div className="lg:col-span-2">
              <p className="text-xs text-amber-300">App Secret</p>
              <div className="flex items-center space-x-2 overflow-hidden">
                <code className="text-xs bg-black/20 px-2 py-1 rounded text-green-400 font-mono overflow-hidden max-w-[150px] whitespace-nowrap">
                  {showSecrets[app._id] ? app.appsecret : '••••••••••••'}
                </code>
                <Button size="sm" variant="ghost" onClick={() => toggleSecret(app._id)} className="h-6 w-6 p-0 text-amber-300 hover:text-white">
                  {showSecrets[app._id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(app.appsecret, 'App Secret')} className="h-6 w-6 p-0 text-amber-300 hover:text-white">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="lg:col-span-1">
              <p className="text-xs text-amber-300 mb-1">Status</p>
              <div className="flex flex-col items-start space-y-1">
                <div
                  onClick={() => !loadingStates[app._id] && handleStatusToggle(app._id, app.is_active)}
                  className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${app.is_active ? 'bg-amber-500' : 'bg-gray-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ${app.is_active ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </div>
                {getStatusBadge(app.is_active)}
              </div>
            </div>

            {/* Admin Approval */}
            <div className="lg:col-span-2">
              <p className="text-xs text-amber-300 mb-1">Admin Approval</p>
              {getApprovalBadge(app.is_admin_approved)}
            </div>

            {/* Created Date */}
            <div className="lg:col-span-1">
              <p className="text-xs text-amber-300 mb-1">Created</p>
              <p className="text-xs text-white">{format(new Date(app.createdAt), 'MMM dd, yyyy')}</p>
            </div>

            {/* Delete Button */}
            <div className="lg:col-span-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="ghost" disabled={loadingStates[app._id]} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-card border-amber-200/20">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete App</AlertDialogTitle>
                    <AlertDialogDescription className="text-amber-200">
                      Are you sure you want to delete "{app.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-amber-100/10 border-amber-200/20 text-amber-200 hover:bg-amber-100/20">Cancel</AlertDialogCancel>
                    <div className="relative group inline-block">
                      <AlertDialogAction
                        onClick={() => handleDelete(app._id)}
                        disabled={true}
                        className="bg-red-600 text-white opacity-50 cursor-not-allowed"
                      >
                        Delete
                      </AlertDialogAction>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
                        Feature coming soon! 🐾
                      </div>
                    </div>

                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
