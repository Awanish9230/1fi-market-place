import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl, ListRenderItem } from 'react-native';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '../common/SkeletonLoader';
import { ErrorState } from '../common/ErrorState';
import { EmptyState } from '../common/EmptyState';
import { spacing } from '../../constants/spacing';
import { colors } from '../../constants/colors';

interface ProductGridProps {
  products?: Product[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  onProductPress: (product: Product) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  ListHeaderComponent?: React.ReactElement;
  onClearFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  isLoading,
  isError,
  onRetry,
  onProductPress,
  onRefresh,
  isRefreshing = false,
  ListHeaderComponent,
  onClearFilters,
}) => {
  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.container}>
        {ListHeaderComponent}
        <ProductGridSkeleton count={6} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        {ListHeaderComponent}
        <ErrorState onRetry={onRetry} />
      </View>
    );
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.cardWrapper}>
      <ProductCard product={item} onPress={onProductPress} />
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item: Product) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <EmptyState
          title="No products found"
          message="We couldn't find any products matching your search criteria."
          actionText="Clear Filters"
          onAction={onClearFilters}
        />
      }
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        ) : undefined
      }
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.massive,
  },
  columnWrapper: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '50%',
  },
});
