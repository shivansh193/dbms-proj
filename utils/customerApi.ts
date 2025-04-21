import { fetchApi } from './api';

// Extended customer API with email lookup
export const customerApi = {
  create: (data: any) => fetchApi('/api/customer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getById: (id: number) => fetchApi(`/api/customer?id=${id}`),
  
  getByEmail: (email: string) => fetchApi(`/api/customer?email=${encodeURIComponent(email)}`),
  
  update: (id: number, data: any) => fetchApi('/api/customer', {
    method: 'PUT',
    body: JSON.stringify({ id, ...data }),
  }),
  
  delete: (id: number) => fetchApi(`/api/customer?id=${id}`, {
    method: 'DELETE',
  }),
};
