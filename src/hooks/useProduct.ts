import useSWR from 'swr';
import { Details as ProductDetails } from '@/types/products';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.easy-orders.net/api/v1';

const fetcher = async (url: string): Promise<ProductDetails> => {
  const response = await fetch(url, {
    // Use keepalive to maintain connection and reduce latency
    keepalive: true,
    // Enable response caching
    cache: 'force-cache',
    // Set priority to high for critical product data
    priority: 'high',
  } as RequestInit);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Custom hook to fetch product details by slug
 * @param slug - Product slug identifier (e.g., "Sneakers12")
 * @param theme - Theme identifier (e.g., "clear-theme")
 * @param includeReviews - Whether to include reviews in the response
 * @returns SWR response with product details, loading state, and error
 */
export const useProductDetails = (
  slug: string,
  theme: string = 'clear-theme',
  includeReviews: boolean = true
) => {
  const joinParam = includeReviews ? '?join=reviews' : '';
  const url = `${API_BASE_URL}/products/slug/${theme}/${slug}${joinParam}`;
  
  const { data, error, isLoading, mutate } = useSWR<ProductDetails>(
    slug ? url : null, 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    product: data,
    isLoading,
    error,
    refetch: mutate, 
  };
};

/**
 * Hook to fetch specific product by slug - convenience wrapper
 * Example: useProduct('Sneakers12')
 */
export const useProduct = (slug: string) => {
  return useProductDetails(slug, 'clear-theme', true);
};
