import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Variant } from '../../types/product';
import { formatCurrency } from '../../utils/currency';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  onSelectVariant: (variant: Variant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  if (!variants || variants.length <= 1) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Select Variant / Storage</Text>
        <Text style={styles.selectedLabel}>{selectedVariant.name}</Text>
      </View>

      <View style={styles.variantList}>
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          return (
            <TouchableOpacity
              key={variant.id}
              activeOpacity={0.8}
              onPress={() => onSelectVariant(variant)}
              style={[
                styles.variantCard,
                isSelected && styles.variantCardSelected,
                isSelected && shadows.sm,
              ]}
            >
              <View style={styles.cardHeader}>
                {variant.colorHex && (
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: variant.colorHex },
                      isSelected && styles.colorDotSelected,
                    ]}
                  />
                )}
                <Text
                  style={[
                    styles.variantName,
                    isSelected && styles.variantNameSelected,
                  ]}
                >
                  {variant.name}
                </Text>
                {isSelected && (
                  <View style={styles.checkIcon}>
                    <Check size={12} color={colors.textInverse} />
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.variantPrice,
                  isSelected && styles.variantPriceSelected,
                ]}
              >
                {formatCurrency(variant.price)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  selectedLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  variantList: {
    gap: spacing.sm,
  },
  variantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.cardBackground,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  variantCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  colorDotSelected: {
    borderColor: colors.primary,
    transform: [{ scale: 1.15 }],
  },
  variantName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  variantNameSelected: {
    color: colors.primaryDark,
    fontWeight: typography.weights.bold,
  },
  checkIcon: {
    width: 18,
    height: 18,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  variantPrice: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  variantPriceSelected: {
    color: colors.primaryDark,
  },
});
