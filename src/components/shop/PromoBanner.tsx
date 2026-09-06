import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, ArrowRight } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface PromoBannerProps {
  onPress?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, shadows.md]}
    >
      <View style={styles.content}>
        <View style={styles.pillBadge}>
          <Sparkles size={12} color={colors.primary} />
          <Text style={styles.pillText}>1Fi Exclusive Offer</Text>
        </View>

        <Text style={styles.title}>
          Upgrade to Flagship Tech with 0% EMI
        </Text>
        <Text style={styles.subtitle}>
          Instant approval against your mutual fund portfolio. Zero paperwork.
        </Text>

        <View style={styles.ctaRow}>
          <Text style={styles.ctaText}>Explore Marketplace</Text>
          <View style={styles.ctaCircle}>
            <ArrowRight size={14} color={colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    borderRadius: borderRadius.xxl,
    backgroundColor: '#6022CD',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#7A3EEA',
  },
  content: {
    padding: spacing.xl,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    marginBottom: spacing.md,
    gap: 4,
  },
  pillText: {
    color: colors.primary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.extrabold,
    color: colors.textInverse,
    lineHeight: 26,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ctaText: {
    color: colors.textInverse,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  ctaCircle: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
