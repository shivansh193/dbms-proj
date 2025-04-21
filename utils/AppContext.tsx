import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartApi } from './api';
import { customerApi } from './customerApi';

// Types
type Customer = {
  id: number;
  name: string;
  email: string;
  contactInfo?: string;
};

type CartItem = {
  cartItemId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  };
};

type Cart = {
  id: number;
  customerId: number;
  cartItems: CartItem[];
  totalPrice: number;
};

interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  customer: Customer | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (data: any) => Promise<{ success: boolean; error?: string }>;
  
  // Cart
  cart: Cart | null;
  cartItemCount: number;
  addToCart: (productId: number, quantity?: number) => Promise<{ success: boolean; error?: string }>;
  updateCartItem: (productId: number, quantity: number) => Promise<{ success: boolean; error?: string }>;
  removeFromCart: (productId: number) => Promise<{ success: boolean; error?: string }>;
  clearCart: () => Promise<{ success: boolean; error?: string }>;
  
  // UI State
  isCartOpen: boolean;
  toggleCart: () => void;
  
  // Location
  userLocation: { latitude: number; longitude: number } | null;
  setUserLocation: (location: { latitude: number; longitude: number } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  
  // Cart state
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // Location state
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  // Load customer from localStorage on mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      try {
        const parsedCustomer = JSON.parse(storedCustomer);
        setCustomer(parsedCustomer);
        setIsLoggedIn(true);
        
        // Fetch cart for this customer
        fetchCustomerCart(parsedCustomer.id);
      } catch (error) {
        console.error('Failed to parse stored customer:', error);
        localStorage.removeItem('customer');
      }
    }
    
    // Try to get stored location
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      try {
        setUserLocation(JSON.parse(storedLocation));
      } catch (error) {
        console.error('Failed to parse stored location:', error);
      }
    }
  }, []);
  
  // Update cart item count whenever cart changes
  useEffect(() => {
    if (cart && cart.cartItems) {
      const count = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(count);
    } else {
      setCartItemCount(0);
    }
  }, [cart]);
  
  // Fetch customer's cart
  const fetchCustomerCart = async (customerId: number) => {
    try {
      const { data, error } = await cartApi.getByCustomerId(customerId);
      
      if (error) {
        console.error('Error fetching cart:', error);
        return;
      }
      
      if (data && data.cart) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };
  
  // Auth functions
  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would call an authentication API
      // For now, we'll simulate it by fetching a customer by email
      // In a real app, you would call an authentication API endpoint
      // For demo purposes, we'll simulate a successful login
      const mockCustomer = {
        id: 1,
        name: 'Demo User',
        email: email
      };
      
      // Simulate API response
      const data = { customer: mockCustomer };
      
      // In a real app, you would verify the password here
      // For now, we'll just simulate successful login
      
      const loggedInCustomer = data.customer;
      setCustomer(loggedInCustomer);
      setIsLoggedIn(true);
      
      // Store customer in localStorage
      localStorage.setItem('customer', JSON.stringify(loggedInCustomer));
      
      // Fetch customer's cart
      await fetchCustomerCart(loggedInCustomer.id);
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };
  
  const logout = () => {
    setCustomer(null);
    setIsLoggedIn(false);
    setCart(null);
    localStorage.removeItem('customer');
  };
  
  const register = async (data: any) => {
    try {
      const response = await customerApi.create(data);
      
      if (response.error) {
        return { success: false, error: response.error };
      }
      
      if (!response.data || !response.data.customer) {
        return { success: false, error: 'Registration failed' };
      }
      
      // Auto-login after registration
      const newCustomer = response.data.customer;
      setCustomer(newCustomer);
      setIsLoggedIn(true);
      
      // Store customer in localStorage
      localStorage.setItem('customer', JSON.stringify(newCustomer));
      
      // Create a new cart for this customer
      const cartResponse = await cartApi.create(newCustomer.id);
      if (cartResponse.data && cartResponse.data.cart) {
        setCart(cartResponse.data.cart);
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };
  
  // Cart functions
  const addToCart = async (productId: number, quantity = 1) => {
    if (!customer) {
      return { success: false, error: 'You must be logged in to add items to cart' };
    }
    
    try {
      // If no cart exists yet, create one
      if (!cart) {
        const { data, error } = await cartApi.create(customer.id);
        
        if (error) {
          return { success: false, error };
        }
        
        if (!data || !data.cart) {
          return { success: false, error: 'Failed to create cart' };
        }
        
        setCart(data.cart as Cart);
      }
      
      // Add item to cart
      const { data, error } = await cartApi.addItem(cart!.id, productId, quantity);
      
      if (error) {
        return { success: false, error };
      }
      
      // Refresh cart
      await fetchCustomerCart(customer.id);
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to add item to cart' };
    }
  };
  
  const updateCartItem = async (productId: number, quantity: number) => {
    if (!customer || !cart) {
      return { success: false, error: 'Cart not found' };
    }
    
    try {
      const { data, error } = await cartApi.updateItem(cart.id, productId, quantity);
      
      if (error) {
        return { success: false, error };
      }
      
      // Refresh cart
      await fetchCustomerCart(customer.id);
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update cart item' };
    }
  };
  
  const removeFromCart = async (productId: number) => {
    if (!customer || !cart) {
      return { success: false, error: 'Cart not found' };
    }
    
    try {
      const { data, error } = await cartApi.removeItem(cart.id, productId);
      
      if (error) {
        return { success: false, error };
      }
      
      // Refresh cart
      await fetchCustomerCart(customer.id);
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to remove item from cart' };
    }
  };
  
  const clearCart = async () => {
    if (!customer || !cart) {
      return { success: false, error: 'Cart not found' };
    }
    
    try {
      const { data, error } = await cartApi.clear(cart.id);
      
      if (error) {
        return { success: false, error };
      }
      
      // Refresh cart
      await fetchCustomerCart(customer.id);
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to clear cart' };
    }
  };
  
  // UI functions
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // Location functions
  const updateUserLocation = (location: { latitude: number; longitude: number } | null) => {
    setUserLocation(location);
    
    if (location) {
      localStorage.setItem('userLocation', JSON.stringify(location));
    } else {
      localStorage.removeItem('userLocation');
    }
  };
  
  const value = {
    // Auth
    isLoggedIn,
    customer,
    login,
    logout,
    register,
    
    // Cart
    cart,
    cartItemCount,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    
    // UI State
    isCartOpen,
    toggleCart,
    
    // Location
    userLocation,
    setUserLocation: updateUserLocation
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}
