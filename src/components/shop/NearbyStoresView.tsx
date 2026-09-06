import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Star, Phone } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { StoreSkeleton } from '../common/SkeletonLoader';

const STORES = [
  {
    id: 'store-1',
    name: 'Croma Megastore',
    category: 'Electronics & Gadgets',
    distance: '1.2 km away',
    address: '100ft Road, Indiranagar, Bengaluru',
    rating: 4.6,
    openUntil: 'Open until 10:00 PM',
  },
  {
    id: 'store-2',
    name: 'Reliance Digital',
    category: 'Home Appliances & Mobiles',
    distance: '2.4 km away',
    address: 'CMH Road, Indiranagar, Bengaluru',
    rating: 4.5,
    openUntil: 'Open until 9:30 PM',
  },
  {
    id: 'store-3',
    name: 'Imagine - Apple Authorised Reseller',
    category: 'Apple Premium Products',
    distance: '3.1 km away',
    address: '12th Main, HAL 2nd Stage, Bengaluru',
    rating: 4.8,
    openUntil: 'Open until 10:00 PM',
  },
];

interface NearbyStoresViewProps {
  onSelectLocation?: () => void;
}

export const NearbyStoresView: React.FC<NearbyStoresViewProps> = ({ onSelectLocation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.locationBanner}>
        <View style={styles.locationLeft}>
          <MapPin size={18} color={colors.primary} />
          <View>
            <Text style={styles.bannerTitle}>Stores near Indiranagar</Text>
            <Text style={styles.bannerSubtitle}>Showing stores within 5 km</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSelectLocation}
          style={styles.changeButton}
        >
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ marginTop: spacing.md }}>
          <StoreSkeleton />
          <StoreSkeleton />
          <StoreSkeleton />
        </View>
      ) : (
        <View style={styles.storeList}>
          {STORES.map((store) => (
            <View key={store.id} style={[styles.storeCard, shadows.sm]}>
              <View style={styles.storeHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeCategory}>{store.category}</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{store.rating}</Text>
                </View>
              </View>

              <Text style={styles.storeAddress}>{store.address}</Text>

              <View style={styles.storeFooter}>
                <View style={styles.distanceBadge}>
                  <Navigation size={12} color={colors.primary} />
                  <Text style={styles.distanceText}>{store.distance}</Text>
                </View>
                <Text style={styles.openText}>{store.openUntil}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primarySoft,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  bannerTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
  },
  bannerSubtitle: {
    fontSize: typography.sizes.xxs,
    color: colors.textMuted,
  },
  changeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.borderPurple,
  },
  changeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  storeList: {
    gap: spacing.md,
  },
  storeCard: {
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  storeName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  storeCategory: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    gap: 3,
  },
  ratingText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: '#92400E',
  },
  storeAddress: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  storeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  openText: {
    fontSize: typography.sizes.xxs,
    color: colors.success,
    fontWeight: typography.weights.medium,
  },
});
