import type { NextApiRequest, NextApiResponse } from 'next';
import { findStoresNearby } from '../../../lib/db/geospatial';
import { getCachedValue, setCachedValue } from '../../../utils/dbCache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng, radius } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }
  
  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);
  const radiusInMeters = radius ? parseInt(radius as string) : 5000;
  
  try {
    // Create cache key based on location with grid precision
    const latRounded = Math.round(latitude * 1000) / 1000;
    const lngRounded = Math.round(longitude * 1000) / 1000;
    const cacheKey = `stores:loc:${latRounded}:${lngRounded}:${radiusInMeters}`;
    
    // Try to get from cache first
    const cachedResults = await getCachedValue(cacheKey);
    if (cachedResults) {
      return res.status(200).json(JSON.parse(cachedResults));
    }
    
    // If not in cache, query database
    const stores = await findStoresNearby(latitude, longitude, radiusInMeters);
    
    // Cache results for 30 minutes
    await setCachedValue(cacheKey, stores, 1800);
    
    return res.status(200).json(stores);
  } catch (error) {
    console.error('Error finding nearby stores:', error);
    return res.status(500).json({ error: 'Failed to find nearby stores' });
  }
}