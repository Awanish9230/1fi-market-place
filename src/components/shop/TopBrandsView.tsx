import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const BRANDS = [
  { id: 'apple', name: 'Apple', tag: 'Up to 24m No Cost EMI', icon: '🍎', count: '14+ Products' },
  { id: 'samsung', name: 'Samsung', tag: 'Special ₹5,000 Voucher', icon: '📱', count: '22+ Products' },
  { id: 'sony', name: 'Sony', tag: 'Instant Cashback', icon: '🎧', count: '18+ Products' },
  { id: 'dell', name: 'Dell', tag: 'Flat 0% Interest', icon: '💻', count: '9+ Products' },
  { id: 'oneplus', name: 'OnePlus', tag: 'Zero Down Payment', icon: '⚡', count: '12+ Products' },
  { id: 'jbl', name: 'JBL', tag: 'Best Audio Deals', icon: '🔊', count: '15+ Products' },
];

interface TopBrandsViewProps {
  onSelectBrand?: (brandName: string) => void;
}

export const TopBrandsView: React.FC<TopBrandsViewProps> = ({ onSelectBrand }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Partner Brands</Text>
        <Text style={styles.sectionSubtitle}>Verified merchant partners on 1Fi</Text>
      </View>

      <View style={styles.grid}>
        {BRANDS.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            activeOpacity={0.8}
            onPress={() => onSelectBrand?.(brand.name)}
            style={[styles.card, shadows.sm]}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 24 }}>{brand.icon}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.brandName}>{brand.name}</Text>
              <Text style={styles.brandTag}>{brand.tag}</Text>
              <Text style={styles.brandCount}>{brand.count}</Text>
            </View>
            <ChevronRight size={18} color={colors.textPlaceholder} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerRow: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  grid: {
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  brandTag: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
    marginTop: 2,
  },
  brandCount: {
    fontSize: typography.sizes.xxs,
    color: colors.textMuted,
    marginTop: 2,
  },
});
