import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { FilterOptions, Product } from '../types/product';

export const PRODUCTS_QUERY_KEY = 'products';

/**
 * Custom TanStack Query hook for fetching products list with filters
 */
export function useProducts(filters?: FilterOptions) {
  return useQuery<Product[], Error>({
    queryKey: [PRODUCTS_QUERY_KEY, filters?.category, filters?.search, filters?.sortBy],
    queryFn: () => productService.getProducts(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
