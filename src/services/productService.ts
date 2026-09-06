import { api } from './api';
import { FilterOptions, Product } from '../types/product';
import mockData from '../../mock-api/db.json';

const fallbackProducts: Product[] = mockData.products as Product[];

export const productService = {
  /**
   * Fetch all products with optional category, search, and sort filters
   */
  async getProducts(filters?: FilterOptions): Promise<Product[]> {
    try {
      // Attempt to fetch from real/mock REST server
      const params: Record<string, string> = {};
      if (filters?.category && filters.category !== 'All') {
        params.category = filters.category;
      }
      if (filters?.search) {
        params.q = filters.search;
      }

      const response = await api.get<Product[]>('/products', { params });
      let data = response.data;

      // Apply client-side sorting if needed
      if (filters?.sortBy === 'price-asc') {
        data.sort((a, b) => a.price - b.price);
      } else if (filters?.sortBy === 'price-desc') {
        data.sort((a, b) => b.price - a.price);
      }

      return data;
    } catch {
      // Fallback to embedded mock dataset with simulated network latency
      await new Promise((resolve) => setTimeout(resolve, 350));

      let filtered = [...fallbackProducts];

      if (filters?.category && filters.category !== 'All') {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }

      if (filters?.search && filters.search.trim() !== '') {
        const query = filters.search.toLowerCase().trim();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }

      if (filters?.sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters?.sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    }
  },

  /**
   * Fetch a single product by its unique identifier
   */
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const found = fallbackProducts.find((p) => p.id === id);
      if (!found) {
        throw new Error(`Product with ID '${id}' not found.`);
      }
      return found;
    }
  },

  /**
   * Fetch distinct available product categories
   */
  async getCategories(): Promise<string[]> {
    return ['All', 'Mobiles', 'Laptops', 'Audio', 'TV', 'Wearables'];
  },
};
