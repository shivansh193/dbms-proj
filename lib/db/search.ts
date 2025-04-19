import { prisma } from '../db';

export async function searchProducts(searchTerm: string) {
  // Use raw query for full-text search
  const results = await prisma.$queryRaw`
    SELECT 
      p.product_id, 
      p.name, 
      p.price,
      p.description,
      p.image_url,
      s.store_name,
      ts_rank(p.search_vector, plainto_tsquery('english', ${searchTerm})) AS rank
    FROM 
      product p
    JOIN 
      store s ON p.store_id = s.store_id
    WHERE 
      p.search_vector @@ plainto_tsquery('english', ${searchTerm})
    ORDER BY 
      rank DESC
    LIMIT 20
  `;
  
  return results;
}

export async function getSearchSuggestions(searchTerm: string) {
  const suggestions = await prisma.$queryRaw`
    SELECT 
      p.name AS suggestion,
      COUNT(*) AS popularity
    FROM 
      product p
    WHERE 
      p.name % ${searchTerm} OR
      p.search_vector @@ plainto_tsquery('english', ${searchTerm})
    GROUP BY 
      p.name
    ORDER BY 
      similarity(p.name, ${searchTerm}) DESC,
      popularity DESC
    LIMIT 10
  `;
  
  return suggestions;
}