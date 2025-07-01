import axios from 'axios';

export interface User {
  id: string;
  email: string;
  name: string;
}

const apiurl = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  company: string
) => {
  try {
    const response = await axios.post(`${apiurl}/api/auth/register`, {
      name,
      email,
      password,
      phone,
      company
    });

    if (response.data?.success) {
      return { data: response.data, error: null };
    }

    return { data: null, error: { message: response.data?.message || 'Signup failed' } };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.response?.data?.message || error.message }
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiurl}/api/auth/login`, {
      email,
      password
    });

    if (response.data?.success && response.data.token) {
      const user: User = {
        id: response.data.data._id,
        email: response.data.data.email,
        name: response.data.data.name
      };

      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(user));

      return { data: { user, token: response.data.token }, error: null };
    }

    return { data: null, error: { message: response.data?.message || 'Login failed' } };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.response?.data?.message || error.message }
    };
  }
};

export const signOut = async () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  return { error: null };
};

export const getCurrentUser = async (): Promise<{ user: User | null; error: any }> => {
  const token = localStorage.getItem('auth_token');
  const userData = localStorage.getItem('user_data');

  if (!token || !userData) {
    return { user: null, error: null };
  }

  try {
    const user = JSON.parse(userData);
    return { user, error: null };
  } catch {
    return { user: null, error: { message: 'Invalid user data' } };
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};
