import { twMerge } from 'tailwind-merge';
import { Product } from '../types';

// Utility function to merge class names with Tailwind CSS (shadcn pattern)
export function cn(...inputs: (string | undefined | null | false | 0)[]) {
  return twMerge(inputs.filter(Boolean).join(' '));
}

// Utility function to fetch product details
export const fetchProductDetails = async (id: string): Promise<Product | null> => {
  try {
    // Mock implementation - replace with actual API call
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
