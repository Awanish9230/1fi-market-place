import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { getStartingEmiText } from '../../utils/emi';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const startingEmi = getStartingEmiText(product.emiPlans);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(product)}
      style={[styles.card, shadows.sm]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.discountPercentage ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {product.originalPrice && product.originalPrice > product.price ? (
            <Text style={styles.originalPrice}>
              {formatCurrency(product.originalPrice)}
            </Text>
          ) : null}
        </View>

        {startingEmi ? (
          <View style={styles.emiBadge}>
            <Text style={styles.emiText}>{startingEmi}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surfaceAlt,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  discountText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
  },
  detailsContainer: {
    padding: spacing.md,
    gap: 4,
  },
  brand: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    lineHeight: 18,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 2,
  },
  price: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  originalPrice: {
    fontSize: typography.sizes.xs,
    color: colors.textPlaceholder,
    textDecorationLine: 'line-through',
  },
  emiBadge: {
    marginTop: 4,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  emiText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
});
