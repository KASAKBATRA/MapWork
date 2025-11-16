export interface User {
  id: string;
  email: string;
  name?: string;
  company?: string;
  role?: 'Admin' | 'Manager' | 'Viewer';
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RegisterData {
  name: string;
  email: string;
  company: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}