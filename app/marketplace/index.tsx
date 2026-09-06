import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/common/Screen';
import { Header } from '../../src/components/common/Header';
import { SearchBar } from '../../src/components/common/SearchBar';
import { CategoryPills } from '../../src/components/marketplace/CategoryPills';
import { ProductGrid } from '../../src/components/marketplace/ProductGrid';
import { useProducts } from '../../src/hooks/useProducts';
import { ProductCategory, Product } from '../../src/types/product';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { colors } from '../../src/constants/colors';

const CATEGORIES: ProductCategory[] = ['All', 'Mobiles', 'Laptops', 'Audio', 'TV', 'Wearables'];

export default function MarketplaceScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: products,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useProducts({
    category: selectedCategory,
    search: searchQuery,
  });

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/marketplace/[productId]',
      params: { productId: product.id },
    });
  };

  const headerContent = (
    <View style={styles.headerContent}>
      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products by name, brand..."
        />
      </View>

      {/* Categories */}
      <CategoryPills
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Result Count and Section Title */}
      <View style={styles.countRow}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
        </Text>
        {products && (
          <Text style={styles.countText}>
            {products.length} {products.length === 1 ? 'result' : 'results'}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <Screen edges={['top', 'left', 'right']}>
      <Header
        title="1Fi Marketplace"
        subtitle="Exclusive 0% No Cost EMI on Electronics"
        showBack
      />

      <ProductGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        onRefresh={refetch}
        isRefreshing={isRefetching}
        onProductPress={handleProductPress}
        ListHeaderComponent={headerContent}
        onClearFilters={() => {
          setSearchQuery('');
          setSelectedCategory('All');
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    paddingBottom: spacing.xs,
  },
  searchWrapper: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  countText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
});
