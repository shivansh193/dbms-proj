"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ApiTestPage() {
  // Form states
  const [vendorForm, setVendorForm] = useState({ businessName: '', storeProfile: '', contactInfo: '' });
  const [storeForm, setStoreForm] = useState({
    vendorId: '',
    name: '',
    description: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    latitude: '',
    longitude: '',
    operatingRadius: '25000'
  });
  const [productForm, setProductForm] = useState({
    storeId: '',
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyLocation, setNearbyLocation] = useState({ latitude: '', longitude: '', radius: '5000' });

  // Results states
  const [vendorResult, setVendorResult] = useState(null);
  const [storeResult, setStoreResult] = useState(null);
  const [productResult, setProductResult] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [nearbyStores, setNearbyStores] = useState(null);
  const [loading, setLoading] = useState({
    vendor: false,
    store: false,
    product: false,
    search: false,
    nearby: false
  });
  const [errors, setErrors] = useState({
    vendor: '',
    store: '',
    product: '',
    search: '',
    nearby: ''
  });

  // Form handlers
  const handleVendorChange = (e) => {
    setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });
  };

  const handleStoreChange = (e) => {
    setStoreForm({ ...storeForm, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleNearbyChange = (e) => {
    setNearbyLocation({ ...nearbyLocation, [e.target.name]: e.target.value });
  };

  // API calls
  const createVendor = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, vendor: true });
    setErrors({ ...errors, vendor: '' });
    
    try {
      const response = await fetch('/api/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorForm)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create vendor');
      }
      
      setVendorResult(data);
      // Auto-fill the vendor ID in store form
      if (data.vendor?.id) {
        setStoreForm({ ...storeForm, vendorId: data.vendor.id.toString() });
      }
    } catch (error) {
      setErrors({ ...errors, vendor: error.message });
    } finally {
      setLoading({ ...loading, vendor: false });
    }
  };

  const createStore = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, store: true });
    setErrors({ ...errors, store: '' });
    
    try {
      const response = await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeForm)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create store');
      }
      
      setStoreResult(data);
      // Auto-fill the store ID in product form
      if (data.store?.id) {
        setProductForm({ ...productForm, storeId: data.store.id.toString() });
      }
    } catch (error) {
      setErrors({ ...errors, store: error.message });
    } finally {
      setLoading({ ...loading, store: false });
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, product: true });
    setErrors({ ...errors, product: '' });
    
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }
      
      setProductResult(data);
    } catch (error) {
      setErrors({ ...errors, product: error.message });
    } finally {
      setLoading({ ...loading, product: false });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, search: true });
    setErrors({ ...errors, search: '' });
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }
      
      setSearchResults(data);
    } catch (error) {
      setErrors({ ...errors, search: error.message });
    } finally {
      setLoading({ ...loading, search: false });
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSearchSuggestions([]);
      return;
    }
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=suggestions`);
      if (response.ok) {
        const suggestions = await response.json();
        setSearchSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const findNearbyStores = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, nearby: true });
    setErrors({ ...errors, nearby: '' });
    
    try {
      const { latitude, longitude, radius } = nearbyLocation;
      const response = await fetch(
        `/api/stores/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to find nearby stores');
      }
      
      setNearbyStores(data);
    } catch (error) {
      setErrors({ ...errors, nearby: error.message });
    } finally {
      setLoading({ ...loading, nearby: false });
    }
  };

  // For search suggestions debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use browser geolocation to get current coordinates
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNearbyLocation({
            ...nearbyLocation,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        (error) => {
          alert(`Unable to get location: ${error.message}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 min-h-screen border-8 border-dashed border-yellow-500">
      <Head>
        <title>Vendor Marketplace API Testing</title>
        <meta name="description" content="Test the vendor marketplace APIs" />
      </Head>

      <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-700 underline decoration-wavy decoration-4">Vendor Marketplace API Testing</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vendor Creation Form */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md border-4 border-blue-400">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 bg-blue-100 p-2 rounded">Create Vendor</h2>
          <form onSubmit={createVendor}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Business Name*</label>
              <input
                type="text"
                name="businessName"
                value={vendorForm.businessName}
                onChange={handleVendorChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Store Profile</label>
              <textarea
                name="storeProfile"
                value={vendorForm.storeProfile}
                onChange={handleVendorChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Contact Info</label>
              <input
                type="text"
                name="contactInfo"
                value={vendorForm.contactInfo}
                onChange={handleVendorChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ring-2 ring-blue-300"
              disabled={loading.vendor}
            >
              {loading.vendor ? 'Creating...' : 'Create Vendor'}
            </button>
            {errors.vendor && <p className="text-red-500 mt-2">{errors.vendor}</p>}
          </form>
          {vendorResult && (
            <div className="mt-4">
              <h3 className="font-medium">Result:</h3>
              <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto">
                {JSON.stringify(vendorResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Store Creation Form */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md border-4 border-green-400">
          <h2 className="text-xl font-semibold mb-4 text-green-700 bg-green-100 p-2 rounded">Create Store</h2>
          <form onSubmit={createStore}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Vendor ID*</label>
                <input
                  type="text"
                  name="vendorId"
                  value={storeForm.vendorId}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Store Name*</label>
                <input
                  type="text"
                  name="name"
                  value={storeForm.name}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={storeForm.description}
                onChange={handleStoreChange}
                className="w-full p-2 border rounded"
                rows={2}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address Line 1*</label>
              <input
                type="text"
                name="addressLine1"
                value={storeForm.addressLine1}
                onChange={handleStoreChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">City*</label>
                <input
                  type="text"
                  name="city"
                  value={storeForm.city}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">State*</label>
                <input
                  type="text"
                  name="state"
                  value={storeForm.state}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Postal Code*</label>
                <input
                  type="text"
                  name="postalCode"
                  value={storeForm.postalCode}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Country*</label>
                <input
                  type="text"
                  name="country"
                  value={storeForm.country}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Latitude*</label>
                <input
                  type="text"
                  name="latitude"
                  value={storeForm.latitude}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g. 40.7128"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Longitude*</label>
                <input
                  type="text"
                  name="longitude"
                  value={storeForm.longitude}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g. -74.0060"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Operating Radius (m)</label>
                <input
                  type="number"
                  name="operatingRadius"
                  value={storeForm.operatingRadius}
                  onChange={handleStoreChange}
                  className="w-full p-2 border rounded"
                  placeholder="25000"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ring-2 ring-green-300"
              disabled={loading.store}
            >
              {loading.store ? 'Creating...' : 'Create Store'}
            </button>
            {errors.store && <p className="text-red-500 mt-2">{errors.store}</p>}
          </form>
          {storeResult && (
            <div className="mt-4">
              <h3 className="font-medium">Result:</h3>
              <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto">
                {JSON.stringify(storeResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Product Creation Form */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-md border-4 border-purple-400">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 bg-purple-100 p-2 rounded">Create Product</h2>
          <form onSubmit={createProduct}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Store ID*</label>
                <input
                  type="text"
                  name="storeId"
                  value={productForm.storeId}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name*</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductChange}
                className="w-full p-2 border rounded"
                rows={2}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={productForm.category}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price*</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={productForm.price}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={productForm.imageUrl}
                onChange={handleProductChange}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 ring-2 ring-purple-300"
              disabled={loading.product}
            >
              {loading.product ? 'Creating...' : 'Create Product'}
            </button>
            {errors.product && <p className="text-red-500 mt-2">{errors.product}</p>}
          </form>
          {productResult && (
            <div className="mt-4">
              <h3 className="font-medium">Result:</h3>
              <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto">
                {JSON.stringify(productResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Search and Nearby Stores */}
        <div className="bg-orange-100 p-6 rounded-lg shadow-md border-4 border-orange-400">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-700 bg-orange-100 p-2 rounded">Search Products</h2>
            <form onSubmit={handleSearch} className="flex items-end gap-2">
              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">Search Query</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter search term..."
                />
                {searchSuggestions.length > 0 && (
                  <div className="bg-white border mt-1 rounded shadow-lg absolute z-10 w-64">
                    {searchSuggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setSearchSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 ring-2 ring-orange-300"
                disabled={loading.search}
              >
                {loading.search ? 'Searching...' : 'Search'}
              </button>
            </form>
            {errors.search && <p className="text-red-500 mt-2">{errors.search}</p>}
            {searchResults && (
              <div className="mt-4">
                <h3 className="font-medium">Search Results:</h3>
                <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto">
                  {JSON.stringify(searchResults, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-teal-700 bg-teal-100 p-2 rounded">Find Nearby Stores</h2>
            <form onSubmit={findNearbyStores}>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    value={nearbyLocation.latitude}
                    onChange={handleNearbyChange}
                    className="w-full p-2 border rounded"
                    required
                    placeholder="e.g. 40.7128"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    value={nearbyLocation.longitude}
                    onChange={handleNearbyChange}
                    className="w-full p-2 border rounded"
                    required
                    placeholder="e.g. -74.0060"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Radius (m)</label>
                  <input
                    type="number"
                    name="radius"
                    value={nearbyLocation.radius}
                    onChange={handleNearbyChange}
                    className="w-full p-2 border rounded"
                    placeholder="5000"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ring-2 ring-gray-300"
                >
                  Use My Location
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 ring-2 ring-teal-300"
                  disabled={loading.nearby}
                >
                  {loading.nearby ? 'Finding...' : 'Find Stores'}
                </button>
              </div>
              {errors.nearby && <p className="text-red-500 mt-2">{errors.nearby}</p>}
            </form>
            {nearbyStores && (
              <div className="mt-4">
                <h3 className="font-medium">Nearby Stores:</h3>
                <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto">
                  {JSON.stringify(nearbyStores, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}