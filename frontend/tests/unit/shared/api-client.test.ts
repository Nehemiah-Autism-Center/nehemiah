import type { InternalAxiosRequestConfig } from 'axios';
import { apiClient } from '@/shared/lib/api-client';

async function sentHeaders(): Promise<InternalAxiosRequestConfig['headers']> {
  let captured: InternalAxiosRequestConfig | undefined;
  await apiClient.get('/system/health', {
    adapter: async (config) => {
      captured = config;
      return { data: {}, status: 200, statusText: 'OK', headers: {}, config };
    },
  });
  if (!captured) throw new Error('request was not sent');
  return captured.headers;
}

describe('apiClient', () => {
  afterEach(() => localStorage.clear());

  it('sends the stored session token as a bearer token', async () => {
    localStorage.setItem('auth-storage', JSON.stringify({ state: { token: 'abc.def.ghi' } }));

    expect((await sentHeaders()).Authorization).toBe('Bearer abc.def.ghi');
  });

  it('still sends requests when the stored session is corrupt, and discards it', async () => {
    localStorage.setItem('auth-storage', '{not json');

    expect((await sentHeaders()).Authorization).toBeUndefined();
    expect(localStorage.getItem('auth-storage')).toBeNull();
  });
});
