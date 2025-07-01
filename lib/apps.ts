import { getAuthToken } from '@/lib/auth';
// Mock app data and API functions
export interface App {
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

// Mock data
const mockApps: App[] = [
  {
    id: 'app_1',
    name: 'My First App',
    user_id: 'user_123',
    app_key: 'ghonchu_abc123def456',
    app_secret: 'sk_secret123456789',
    is_active: true,
    is_del: false,
    is_admin_approved: true,
    enable_generation: true,
    enable_rewrite: false,
    enable_translate: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'app_2',
    name: 'Translation Bot',
    user_id: 'user_123',
    app_key: 'ghonchu_xyz789ghi012',
    app_secret: 'sk_secret987654321',
    is_active: false,
    is_del: false,
    is_admin_approved: false,
    enable_generation: false,
    enable_rewrite: true,
    enable_translate: true,
    created_at: '2024-01-20T14:15:00Z',
    updated_at: '2024-01-20T14:15:00Z'
  },
  {
    id: 'app_3',
    name: 'Content Generator',
    user_id: 'user_123',
    app_key: 'ghonchu_mno345pqr678',
    app_secret: 'sk_secret555666777',
    is_active: true,
    is_del: false,
    is_admin_approved: true,
    enable_generation: true,
    enable_rewrite: true,
    enable_translate: false,
    created_at: '2024-01-25T09:45:00Z',
    updated_at: '2024-01-25T09:45:00Z'
  }
];

// Generate unique app key and secret
const generateAppKey = () => {
  return 'ghonchu_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const generateAppSecret = () => {
  return 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

interface CreateAppPayload {
  name: string;
  enableGeneration: boolean;
  enableRewrite: boolean;
  enableTranslate: boolean;
  token: string;
}

export async function createApp(payload: CreateAppPayload) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/app/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        name: payload.name,
        enable_generation: payload.enableGeneration,
        enable_rewrite: payload.enableRewrite,
        enable_translate: payload.enableTranslate,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { data: null, error: data?.message || 'Failed to create app' };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Network error or server unavailable' };
  }
}

export const getUserApps = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/app/user-apps`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    // Optional filter if needed by userId (API already filters by token)
    const userApps = json.data.filter((app: any) => app.userId._id === userId && !app.is_del);

    return { data: userApps, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Something went wrong' };
  }
};


export const updateAppStatus = async (appId: string, isActive: boolean) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const appIndex = mockApps.findIndex(app => app.id === appId);
  if (appIndex === -1) {
    return { data: null, error: { message: 'App not found' } };
  }

  mockApps[appIndex] = {
    ...mockApps[appIndex],
    is_active: isActive,
    updated_at: new Date().toISOString()
  };

  return { data: mockApps[appIndex], error: null };
};

export const deleteApp = async (appId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const appIndex = mockApps.findIndex(app => app.id === appId);
  if (appIndex === -1) {
    return { data: null, error: { message: 'App not found' } };
  }

  // Soft delete
  mockApps[appIndex] = {
    ...mockApps[appIndex],
    is_del: true,
    updated_at: new Date().toISOString()
  };

  return { data: mockApps[appIndex], error: null };
};