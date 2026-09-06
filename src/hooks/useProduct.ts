import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { Product } from '../types/product';

export const PRODUCT_DETAIL_QUERY_KEY = 'product-detail';

/**
 * Custom TanStack Query hook for fetching a single product
 */
export function useProduct(productId?: string) {
  return useQuery<Product, Error>({
    queryKey: [PRODUCT_DETAIL_QUERY_KEY, productId],
    queryFn: () => {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      return productService.getProductById(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
}
