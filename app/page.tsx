"use client";
import React, { useState } from "react";

export default function ExampleFeaturePage() {
  // Form state
  const [form, setForm] = useState({
    storeId: "",
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
    searchTerm: "",
    lat: "",
    lng: "",
    radius: "5000"
  });
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults({});
    try {
      // 1. Create product
      const createRes = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeId: form.storeId,
          name: form.name,
          description: form.description,
          category: form.category,
          price: form.price,
          stock: form.stock,
          imageUrl: form.imageUrl,
        }),
      });
      const createdProduct = await createRes.json();

      // 2. Cached product search
      const searchRes = await fetch(`/api/search?q=${encodeURIComponent(form.searchTerm)}`);
      const searchResults = await searchRes.json();

      // 3. Cached search suggestions
      const suggRes = await fetch(`/api/search?q=${encodeURIComponent(form.searchTerm)}&type=suggestions`);
      const suggestions = await suggRes.json();

      // 4. Nearby stores
      let storesNearby = [];
      if (form.lat && form.lng) {
        const storesRes = await fetch(`/api/stores/nearby?lat=${form.lat}&lng=${form.lng}&radius=${form.radius}`);
        storesNearby = await storesRes.json();
      }

      setResults({ createdProduct, searchResults, suggestions, storesNearby });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "auto", padding: 32 }}>
      <h1>Database Feature Demo</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: 12 }} onSubmit={e => e.preventDefault()}>
        <h2>Create Product</h2>
        <input name="storeId" placeholder="Store ID (required)" value={form.storeId} onChange={handleChange} required />
        <input name="name" placeholder="Product Name (required)" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="price" placeholder="Price (required)" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
        <button type="button" onClick={async () => {
          setLoading(true);
          setError("");
          try {
            const createRes = await fetch("/api/product", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                storeId: form.storeId,
                name: form.name,
                description: form.description,
                category: form.category,
                price: form.price,
                stock: form.stock,
                imageUrl: form.imageUrl,
              }),
            });
            const createdProduct = await createRes.json();
            setResults((prev: any) => ({ ...prev, createdProduct }));
            setForm(f => ({ ...f, name: "", description: "", category: "", price: "", stock: "", imageUrl: "" }));
          } catch (err: any) {
            setError(err.message || "Unknown error");
          } finally {
            setLoading(false);
          }
        }} disabled={loading}>
          {loading ? "Posting..." : "Post Product"}
        </button>
        <h2>Search Features</h2>
        <input name="searchTerm" placeholder="Search Term" value={form.searchTerm} onChange={handleChange} autoComplete="off" />
        {form.searchTerm && (
          <DynamicSearchResults searchTerm={form.searchTerm} />
        )}
        <h2>Nearby Stores/Products</h2>
        <input name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange} />
        <input name="lng" placeholder="Longitude" value={form.lng} onChange={handleChange} />
        <input name="radius" placeholder="Radius (meters)" type="number" value={form.radius} onChange={handleChange} />
        <button type="button" onClick={async () => {
          setLoading(true);
          setError("");
          try {
            let storesNearby = [];
            if (form.lat && form.lng) {
              const storesRes = await fetch(`/api/stores/nearby?lat=${form.lat}&lng=${form.lng}&radius=${form.radius}`);
              storesNearby = await storesRes.json();
            }
            setResults((prev: any) => ({ ...prev, storesNearby }));
          } catch (err: any) {
            setError(err.message || "Unknown error");
          } finally {
            setLoading(false);
          }
        }} disabled={loading}>
          {loading ? "Loading..." : "Find Nearby Stores"}
        </button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ marginTop: 32 }}>
        {results.createdProduct && (
          <section>
            <h3>Created Product</h3>
            <pre>{JSON.stringify(results.createdProduct, null, 2)}</pre>
          </section>
        )}
        {results.storesNearby && (
          <section>
            <h3>Stores Nearby</h3>
            <pre>{JSON.stringify(results.storesNearby, null, 2)}</pre>
          </section>
        )}
      </div>
      <div style={{ marginTop: 32, color: '#888' }}>
        <h4>Feature Coverage</h4>
        <ul>
          <li>Product creation (POST /api/product)</li>
          <li>Product search (cached, /api/search)</li>
          <li>Search suggestions (cached, /api/search?type=suggestions)</li>
          <li>Nearby stores (cached, /api/stores/nearby)</li>
        </ul>
        <p>For inventory update, cache utilities, and direct fetch, see code comments or extend this page.</p>
      </div>
    </main>
  );
}

// Debounced dynamic search bar results
function DynamicSearchResults({ searchTerm }: { searchTerm: string }) {
  const [results, setResults] = React.useState<any>(null);
  const [suggestions, setSuggestions] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!searchTerm) {
      setResults(null);
      setSuggestions(null);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const [searchRes, suggRes] = await Promise.all([
          fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`),
          fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&type=suggestions`)
        ]);
        setResults(await searchRes.json());
        setSuggestions(await suggRes.json());
      } finally {
        setLoading(false);
      }
    }, 400); // debounce
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  if (!searchTerm) return null;
  return (
    <section style={{ margin: '16px 0', background: '#f8f8f8', padding: 12, borderRadius: 8 }}>
      <strong>Live Search Results for: "{searchTerm}"</strong>
      {loading && <div>Loading...</div>}
      {results && (
        <div>
          <div style={{ fontWeight: 600 }}>Products:</div>
          <pre style={{ maxHeight: 160, overflow: 'auto' }}>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
      {suggestions && (
        <div>
          <div style={{ fontWeight: 600 }}>Suggestions:</div>
          <pre style={{ maxHeight: 160, overflow: 'auto' }}>{JSON.stringify(suggestions, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}
