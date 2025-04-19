import type { NextApiRequest, NextApiResponse } from 'next';
import { getCachedSearchResults, getCachedSearchSuggestions } from '../../lib/db/cachedSearch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q, type } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    if (type === 'suggestions') {
      const suggestions = await getCachedSearchSuggestions(q);
      return res.status(200).json(suggestions);
    } else {
      const results = await getCachedSearchResults(q);
      return res.status(200).json(results);
    }
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Failed to perform search' });
  }
}