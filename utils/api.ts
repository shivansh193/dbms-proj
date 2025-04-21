// API client for making requests to our backend endpoints
import { useState, useEffect } from 'react';

// Types
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

// Base API client function
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.error || 'Something went wrong';
      return { data: null, error: errorMessage };
    }

    return { data: responseData, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Network error' };
  }
}

// Hook for fetching data
export function useApi<T>(endpoint: string, options: RequestInit = {}, dependencies: any[] = []) {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true }));
      
      const { data, error } = await fetchApi<T>(endpoint, options);
      
      if (isMounted) {
        setState({ data, error, loading: false });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, ...dependencies]);

  return state;
}

// Vendor API
export const vendorApi = {
  create: (data: any) => fetchApi('/api/vendor', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getById: (id: number) => fetchApi(`/api/vendor/${id}`),
  
  update: (id: number, data: any) => fetchApi(`/api/vendor/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, ...data }),
  }),
  
  delete: (id: number) => fetchApi(`/api/vendor/${id}`, {
    method: 'DELETE',
  }),
  
  getAnalytics: (vendorId: number) => fetchApi(`/api/vendor/analytics?vendorId=${vendorId}`),
  
  getPayouts: (vendorId: number, page = 1, limit = 10) => 
    fetchApi(`/api/vendor/payouts?vendorId=${vendorId}&page=${page}&limit=${limit}`),
    
  createPayout: (data: any) => fetchApi('/api/vendor/payouts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Store API
export const storeApi = {
  create: (data: any) => fetchApi('/api/store', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getById: (id: number) => fetchApi(`/api/stores/${id}`),
  
  update: (id: number, data: any) => fetchApi(`/api/stores/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, ...data }),
  }),
  
  delete: (id: number) => fetchApi(`/api/stores/${id}`, {
    method: 'DELETE',
  }),
  
  getNearby: (lat: number, lng: number, radius = 5000) => 
    fetchApi(`/api/stores/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
};

// Product API
export const productApi = {
  create: (data: any) => fetchApi('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getById: (id: number) => fetchApi(`/api/products/${id}`),
  
  update: (id: number, data: any) => fetchApi(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: number) => fetchApi(`/api/products/${id}`, {
    method: 'DELETE',
  }),
  
  search: (query: string) => fetchApi(`/api/search?q=${encodeURIComponent(query)}`),
  
  getSuggestions: (query: string) => 
    fetchApi(`/api/search?q=${encodeURIComponent(query)}&type=suggestions`),
    
  getFiltered: (params: Record<string, any>) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    
    return fetchApi(`/api/products?${queryParams.toString()}`);
  },
};

// Customer API
export const customerApi = {
  create: (data: any) => fetchApi('/api/customer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getById: (id: number) => fetchApi(`/api/customer?id=${id}`),
  
  update: (id: number, data: any) => fetchApi('/api/customer', {
    method: 'PUT',
    body: JSON.stringify({ id, ...data }),
  }),
  
  delete: (id: number) => fetchApi(`/api/customer?id=${id}`, {
    method: 'DELETE',
  }),
};

// Cart API
export const cartApi = {
  getByCustomerId: (customerId: number) => fetchApi(`/api/cart?customerId=${customerId}`),
  
  create: (customerId: number) => fetchApi('/api/cart', {
    method: 'POST',
    body: JSON.stringify({ customerId }),
  }),
  
  clear: (cartId: number) => fetchApi(`/api/cart?cartId=${cartId}`, {
    method: 'DELETE',
  }),
  
  addItem: (cartId: number, productId: number, quantity = 1) => fetchApi('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ cartId, productId, quantity }),
  }),
  
  updateItem: (cartId: number, productId: number, quantity: number) => fetchApi('/api/cart/items', {
    method: 'PUT',
    body: JSON.stringify({ cartId, productId, quantity }),
  }),
  
  removeItem: (cartId: number, productId: number) => 
    fetchApi(`/api/cart/items?cartId=${cartId}&productId=${productId}`, {
      method: 'DELETE',
    }),
};

// Order API
export const orderApi = {
  create: (data: any) => fetchApi('/api/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getById: (id: number) => fetchApi(`/api/orders?id=${id}`),
  
  getByCustomerId: (customerId: number, page = 1, limit = 10) => 
    fetchApi(`/api/orders?customerId=${customerId}&page=${page}&limit=${limit}`),
    
  updateStatus: (id: number, orderStatus: string, paymentStatus?: string) => fetchApi('/api/orders', {
    method: 'PUT',
    body: JSON.stringify({ id, orderStatus, paymentStatus }),
  }),
};

// Review API
export const reviewApi = {
  create: (data: any) => fetchApi('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getByProductId: (productId: number, page = 1, limit = 10) => 
    fetchApi(`/api/reviews?productId=${productId}&page=${page}&limit=${limit}`),
    
  getByCustomerId: (customerId: number, page = 1, limit = 10) => 
    fetchApi(`/api/reviews?customerId=${customerId}&page=${page}&limit=${limit}`),
    
  delete: (id: number) => fetchApi(`/api/reviews?id=${id}`, {
    method: 'DELETE',
  }),
};

// Payment API
export const paymentApi = {
  create: (data: any) => fetchApi('/api/payments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getByOrderId: (orderId: number) => fetchApi(`/api/payments?orderId=${orderId}`),
  
  updateStatus: (id: number, paymentStatus: string, transactionId?: string) => fetchApi('/api/payments', {
    method: 'PUT',
    body: JSON.stringify({ id, paymentStatus, transactionId }),
  }),
};
