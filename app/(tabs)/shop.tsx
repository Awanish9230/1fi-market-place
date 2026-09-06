import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Check } from 'lucide-react-native';
import { Screen } from '../../src/components/common/Screen';
import { ShopHeader } from '../../src/components/shop/ShopHeader';
import { PromoBanner } from '../../src/components/shop/PromoBanner';
import { ShopTabs, ShopTabType } from '../../src/components/shop/ShopTabs';
import { TopBrandsView } from '../../src/components/shop/TopBrandsView';
import { NearbyStoresView } from '../../src/components/shop/NearbyStoresView';
import { SearchBar } from '../../src/components/common/SearchBar';
import { CategoryPills } from '../../src/components/marketplace/CategoryPills';
import { ProductGrid } from '../../src/components/marketplace/ProductGrid';
import { useProducts } from '../../src/hooks/useProducts';
import { ProductCategory, Product } from '../../src/types/product';
import { colors } from '../../src/constants/colors';
import { spacing, borderRadius, shadows } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';

const CATEGORIES: ProductCategory[] = ['All', 'Mobiles', 'Laptops', 'Audio', 'TV', 'Wearables'];

const LOCATIONS = [
  'Indiranagar, Bengaluru',
  'Koramangala, Bengaluru',
  'HSR Layout, Bengaluru',
  'Whitefield, Bengaluru',
  'Bandra West, Mumbai',
  'Cyber City, Gurugram',
];

export default function ShopScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ShopTabType>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Indiranagar, Bengaluru');
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  // TanStack React Query for data fetching
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

  const handleBrandSelect = (brandName: string) => {
    setActiveTab('marketplace');
    setSearchQuery(brandName);
  };

  const marketplaceHeader = useMemo(() => {
    return (
      <View style={styles.marketplaceHeader}>
        {/* Search Input */}
        <View style={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search electronics, mobiles, laptops..."
          />
        </View>

        {/* Category Pills */}
        <CategoryPills
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Section Heading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'Featured Electronics' : `${selectedCategory} on 0% EMI`}
          </Text>
          {products && products.length > 0 && (
            <Text style={styles.itemCount}>
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </Text>
          )}
        </View>
      </View>
    );
  }, [searchQuery, selectedCategory, products]);

  return (
    <Screen edges={['top', 'left', 'right']}>
      {/* 1Fi Shop Top Header */}
      <ShopHeader
        location={selectedLocation}
        onLocationPress={() => setLocationModalVisible(true)}
      />

      {/* Promotional Banner */}
      <PromoBanner onPress={() => setActiveTab('marketplace')} />

      {/* 3-Way Segment Switcher: Top Brands | Nearby Stores | 1Fi Marketplace */}
      <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Contents */}
      {activeTab === 'marketplace' && (
        <ProductGrid
          products={products}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
          onRefresh={refetch}
          isRefreshing={isRefetching}
          onProductPress={handleProductPress}
          ListHeaderComponent={marketplaceHeader}
          onClearFilters={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      )}

      {activeTab === 'top-brands' && (
        <TopBrandsView onSelectBrand={handleBrandSelect} />
      )}

      {activeTab === 'nearby-stores' && (
        <NearbyStoresView onSelectLocation={() => setLocationModalVisible(true)} />
      )}

      {/* Location Selection Bottom Sheet Modal */}
      <Modal
        visible={locationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setLocationModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Delivery Location</Text>
            <Text style={styles.modalSubtitle}>
              Shows available products and nearby pickup hubs
            </Text>

            <View style={styles.locationList}>
              {LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc;
                return (
                  <TouchableOpacity
                    key={loc}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedLocation(loc);
                      setLocationModalVisible(false);
                    }}
                    style={[
                      styles.locationItem,
                      isSelected && styles.locationItemSelected,
                    ]}
                  >
                    <View style={styles.locationItemLeft}>
                      <MapPin
                        size={18}
                        color={isSelected ? colors.primary : colors.textMuted}
                      />
                      <Text
                        style={[
                          styles.locationItemText,
                          isSelected && styles.locationItemTextSelected,
                        ]}
                      >
                        {loc}
                      </Text>
                    </View>
                    {isSelected && <Check size={18} color={colors.primary} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  marketplaceHeader: {
    paddingBottom: spacing.xs,
  },
  searchWrapper: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  sectionHeader: {
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
  itemCount: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.xl,
    paddingBottom: spacing.massive,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  locationList: {
    gap: spacing.sm,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceMuted,
  },
  locationItemSelected: {
    backgroundColor: colors.primarySoft,
  },
  locationItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  locationItemText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  locationItemTextSelected: {
    color: colors.primaryDark,
    fontWeight: typography.weights.bold,
  },
});
