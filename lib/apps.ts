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


export const mockApps: App[] = [
  {
    _id: '1',
    name: 'Ghonchu AI',
    appkey: 'ghonchu-ai-key',
    appsecret: 'ghonchu-ai-secret',
    is_active: true,
    is_admin_approved: true,
    enable_generation: true,
    enable_rewrite: true,
    enable_translate: true,
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
    is_del: false,
    userId: {
      _id: 'user1',
      name: 'John Doe',
      email: 'IhIgM@example.com',
    },
    __v: 0,
  },
];



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

  const appIndex = mockApps.findIndex(app => app._id === appId);
  if (appIndex === -1) {
    return { data: null, error: { message: 'App not found' } };
  }

  mockApps[appIndex] = {
    ...mockApps[appIndex],
    is_active: isActive,
    updatedAt: new Date().toISOString()
  };

  return { data: mockApps[appIndex], error: null };
};

export const deleteApp = async (appId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const appIndex = mockApps.findIndex(app => app._id === appId);
  if (appIndex === -1) {
    return { data: null, error: { message: 'App not found' } };
  }

  // Soft delete
  mockApps[appIndex] = {
    ...mockApps[appIndex],
    is_del: true,
    updatedAt: new Date().toISOString()
  };

  return { data: mockApps[appIndex], error: null };
};