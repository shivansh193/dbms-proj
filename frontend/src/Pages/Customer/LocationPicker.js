import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationPicker = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          // Default to a central location if geolocation fails
          setPosition([51.505, -0.09]);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      setPosition([51.505, -0.09]);
    }

    // Load saved locations from localStorage
    const saved = JSON.parse(localStorage.getItem('savedLocations')) || [];
    setSavedLocations(saved);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // In a real app, this would use a geocoding API
    console.log('Searching for:', searchQuery);
    // Mock response
    setPosition([51.51, -0.1]);
    setAddress(`Mock address for ${searchQuery}, London, UK`);
  };

  const saveLocation = () => {
    if (!position || !address) return;

    const newLocation = {
      id: Date.now(),
      position,
      address,
      isDefault: savedLocations.length === 0
    };

    const updatedLocations = [...savedLocations, newLocation];
    setSavedLocations(updatedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
    setAddress('');
  };

  const setAsDefault = (id) => {
    const updatedLocations = savedLocations.map(loc => ({
      ...loc,
      isDefault: loc.id === id
    }));
    setSavedLocations(updatedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
  };

  const removeLocation = (id) => {
    const updatedLocations = savedLocations.filter(loc => loc.id !== id);
    setSavedLocations(updatedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        // In a real app, you would reverse geocode here to get the address
        setAddress(`Selected location (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>{address || 'Your location'}</Popup>
      </Marker>
    );
  };

  if (!position) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Select Your Location</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-96">
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>
          
          <div className="mt-4 bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for an address or place"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition"
              >
                Search
              </button>
            </form>
            
            <div className="flex items-center">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={saveLocation}
                disabled={!address}
                className={`px-4 py-2 rounded-r-md transition ${address ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Saved Locations</h2>
            
            {savedLocations.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-map-marker-alt text-3xl text-gray-300 mb-3"></i>
                <p className="text-gray-600">No saved locations yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedLocations.map(location => (
                  <div 
                    key={location.id} 
                    className={`border rounded-md p-3 ${location.isDefault ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{location.address}</p>
                        <p className="text-sm text-gray-500">
                          {location.position[0].toFixed(4)}, {location.position[1].toFixed(4)}
                        </p>
                      </div>
                      {location.isDefault && (
                        <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full h-6">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      {!location.isDefault && (
                        <button
                          onClick={() => setAsDefault(location.id)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded transition"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => removeLocation(location.id)}
                        className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Areas</h2>
            <div className="prose prose-sm text-gray-600">
              <p>We currently deliver to the following areas:</p>
              <ul className="list-disc pl-5">
                <li>Central London</li>
                <li>North London</li>
                <li>East London</li>
                <li>South London</li>
                <li>West London</li>
              </ul>
              <p className="mt-2">Delivery outside these areas may incur additional charges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;