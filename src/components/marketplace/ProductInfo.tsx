import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Product, Variant } from '../../types/product';
import { formatCurrency } from '../../utils/currency';

interface ProductInfoProps {
  product: Product;
  selectedVariant?: Variant;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedVariant,
}) => {
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;

  return (
    <View style={styles.container}>
      {/* Brand & Title */}
      <View style={styles.header}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title}>{product.name}</Text>
      </View>

      {/* Ratings & Category */}
      <View style={styles.metaRow}>
        {product.rating && (
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{product.rating}</Text>
            {product.reviewsCount && (
              <Text style={styles.reviewsText}>({product.reviewsCount})</Text>
            )}
          </View>
        )}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
      </View>

      {/* Pricing Row */}
      <View style={styles.pricingRow}>
        <Text style={styles.price}>{formatCurrency(currentPrice)}</Text>
        {originalPrice && originalPrice > currentPrice ? (
          <>
            <Text style={styles.originalPrice}>{formatCurrency(originalPrice)}</Text>
            {product.discountPercentage ? (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
              </View>
            ) : null}
          </>
        ) : null}
      </View>

      {/* Description */}
      {product.description && (
        <Text style={styles.description}>{product.description}</Text>
      )}

      {/* Highlights */}
      {product.highlights && product.highlights.length > 0 && (
        <View style={styles.highlightsContainer}>
          <Text style={styles.sectionTitle}>Key Highlights</Text>
          <View style={styles.highlightsList}>
            {product.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <CheckCircle2 size={16} color={colors.primary} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Technical Specifications */}
      {product.specs && product.specs.length > 0 && (
        <View style={styles.specsContainer}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsTable}>
            {product.specs.map((spec, index) => (
              <View
                key={index}
                style={[
                  styles.specRow,
                  index % 2 === 0 && styles.specRowAlt,
                ]}
              >
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  header: {
    marginBottom: spacing.xs,
  },
  brand: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  ratingText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: '#92400E',
  },
  reviewsText: {
    fontSize: typography.sizes.xxs,
    color: '#B45309',
  },
  categoryBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  price: {
    fontSize: typography.sizes.heading,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
  },
  originalPrice: {
    fontSize: typography.sizes.base,
    color: colors.textPlaceholder,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  discountText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  description: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  highlightsContainer: {
    marginBottom: spacing.lg,
  },
  highlightsList: {
    gap: spacing.sm,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  highlightText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  specsContainer: {
    marginBottom: spacing.md,
  },
  specsTable: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.cardBackground,
  },
  specRowAlt: {
    backgroundColor: colors.surfaceMuted,
  },
  specLabel: {
    width: 120,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textMuted,
  },
  specValue: {
    flex: 1,
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
  },
});
