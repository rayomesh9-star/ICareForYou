import { api } from './api';
import { setToken } from './storage';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  role: string;
  fullName?: string;
};


type AuthResponse = {
  token: string;
};

export async function login(payload: LoginPayload): Promise<void> {
  const res = await api.post<AuthResponse>('/api/auth/login', payload);
  setToken(res.data.token);
}

export async function register(payload: RegisterPayload): Promise<void> {
  await api.post('/api/auth/register', payload);
}

