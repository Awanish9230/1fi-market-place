import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle2, ShieldCheck, Sparkles, Home, ShoppingBag } from 'lucide-react-native';
import { Screen } from '../src/components/common/Screen';
import { Header } from '../src/components/common/Header';
import { Button } from '../src/components/common/Button';
import { colors } from '../src/constants/colors';
import { spacing, borderRadius, shadows } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { formatCurrency } from '../src/utils/currency';

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    productName: string;
    brand: string;
    productImage: string;
    variantName: string;
    productPrice: string;
    months: string;
    monthlyAmount: string;
    totalAmount: string;
    isNoCost: string;
  }>();

  const productPrice = parseFloat(params.productPrice || '0');
  const monthlyAmount = parseFloat(params.monthlyAmount || '0');
  const totalAmount = parseFloat(params.totalAmount || '0');
  const months = parseInt(params.months || '6', 10);
  const isNoCost = params.isNoCost === 'true';

  return (
    <Screen edges={['top', 'left', 'right', 'bottom']}>
      <Header
        title="Order & EMI Summary"
        showBack
        onBack={() => router.replace('/(tabs)/shop')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Hero */}
        <View style={styles.successBadge}>
          <CheckCircle2 size={44} color={colors.primary} />
          <Text style={styles.successTitle}>EMI Plan Selected!</Text>
          <Text style={styles.successSubtitle}>
            Your mutual fund credit limit has been pre-approved for this order.
          </Text>
        </View>

        {/* Product Preview Card */}
        <View style={[styles.card, shadows.sm]}>
          <View style={styles.productRow}>
            <Image
              source={require('../assets/1fi-logo.png')}
              style={styles.productThumb}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.brandText}>{params.brand}</Text>
              <Text style={styles.productName}>{params.productName}</Text>
              <Text style={styles.variantBadge}>{params.variantName}</Text>
            </View>
          </View>
        </View>

        {/* EMI Breakdown Card */}
        <View style={[styles.breakdownCard, shadows.sm]}>
          <View style={styles.breakdownHeader}>
            <Text style={styles.breakdownTitle}>Financing Breakdown</Text>
            {isNoCost && (
              <View style={styles.noCostTag}>
                <Sparkles size={12} color={colors.primary} />
                <Text style={styles.noCostText}>0% No Cost EMI</Text>
              </View>
            )}
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Tenure</Text>
            <Text style={styles.rowValue}>{months} Months</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Monthly EMI</Text>
            <Text style={styles.rowValueHighlight}>{formatCurrency(monthlyAmount)} / mo</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Product Price</Text>
            <Text style={styles.rowValue}>{formatCurrency(productPrice)}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Interest Rate</Text>
            <Text style={styles.rowValue}>{isNoCost ? '0% (Subsidized by 1Fi)' : '15% p.a.'}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Processing Fee</Text>
            <Text style={styles.rowValue}>{isNoCost ? '₹0 (Waived)' : '₹199'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.totalLabel}>Total Repayment</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        {/* MF Security Assurance */}
        <View style={styles.assuranceBox}>
          <ShieldCheck size={20} color={colors.success} />
          <Text style={styles.assuranceText}>
            Secured by your active mutual fund portfolio. Mutual fund units remain invested and continue generating returns.
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.bottomContainer, shadows.md]}>
        <Button
          title="Back to Shop"
          onPress={() => router.replace('/(tabs)/shop')}
          variant="primary"
          leftIcon={<ShoppingBag size={18} color={colors.textInverse} />}
        />
        <Button
          title="Go to Home"
          onPress={() => router.replace('/(tabs)')}
          variant="outline"
          size="md"
          leftIcon={<Home size={16} color={colors.primary} />}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 160,
  },
  successBadge: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.xs,
  },
  successTitle: {
    fontSize: typography.sizes.heading,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  successSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productThumb: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceAlt,
    marginRight: spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  brandText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginVertical: 2,
  },
  variantBadge: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  breakdownCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  breakdownTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  noCostTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    gap: 4,
  },
  noCostText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rowLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  rowValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  rowValueHighlight: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.extrabold,
    color: colors.primaryDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
  },
  assuranceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.md,
  },
  assuranceText: {
    flex: 1,
    fontSize: typography.sizes.xs,
    color: colors.success,
    lineHeight: 16,
    fontWeight: typography.weights.medium,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});
