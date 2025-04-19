import { searchProducts, getSearchSuggestions } from './search';
import { getCachedValue, setCachedValue } from '../../utils/dbCache';
import {prisma} from "../db"
export async function getCachedSearchResults(searchTerm: string) {
  const cacheKey = `search:results:${searchTerm.toLowerCase()}`;
  
  // Try to get from cache first
  const cachedResults = await getCachedValue(cacheKey);
  if (cachedResults) {
    return JSON.parse(cachedResults);
  }
  
  // If not in cache, query database
  const results = await searchProducts(searchTerm);
  
  // Cache the results for 15 minutes
  await setCachedValue(cacheKey, results, 900);
  
  return results;
}

export async function getCachedSearchSuggestions(searchTerm: string) {
  const cacheKey = `search:suggestions:${searchTerm.toLowerCase()}`;
  
  // Try to get from cache first
  const cachedSuggestions = await getCachedValue(cacheKey);
  if (cachedSuggestions) {
    return JSON.parse(cachedSuggestions);
  }
  
  // If not in cache, query database
  const suggestions = await getSearchSuggestions(searchTerm);
  
  // Cache the suggestions for 10 minutes
  await setCachedValue(cacheKey, suggestions, 600);
  
  // Track popular searches - this would need to be reimplemented differently
  // Could use a separate table for tracking popular searches
  await trackPopularSearch(searchTerm.toLowerCase());
  
  return suggestions;
}

// Function to track popular searches in PostgreSQL
async function trackPopularSearch(searchTerm: string) {
  // You could implement this with a separate popular_searches table
  await prisma.$executeRaw`
    INSERT INTO popular_searches (term, count)
    VALUES (${searchTerm}, 1)
    ON CONFLICT (term) DO UPDATE
    SET count = popular_searches.count + 1, last_searched = NOW()
  `;
}