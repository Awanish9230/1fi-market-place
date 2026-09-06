import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, ArrowRight, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react-native';
import { Screen } from '../../src/components/common/Screen';
import { colors } from '../../src/constants/colors';
import { spacing, borderRadius, shadows } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { formatCurrency } from '../../src/utils/currency';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen scrollable>
      <View style={styles.container}>
        {/* Top greeting */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Hello, Awanish 👋</Text>
            <Text style={styles.subGreeting}>Here is your 1Fi financial overview</Text>
          </View>
        </View>

        {/* Portfolio Credit Limit Card */}
        <View style={[styles.creditCard, shadows.md]}>
          <View style={styles.creditHeader}>
            <View style={styles.badge}>
              <ShieldCheck size={14} color={colors.primary} />
              <Text style={styles.badgeText}>Verified Mutual Fund Limit</Text>
            </View>
            <Text style={styles.activeText}>Active</Text>
          </View>

          <Text style={styles.creditLabel}>Available Credit Limit</Text>
          <Text style={styles.creditAmount}>{formatCurrency(250000)}</Text>

          <View style={styles.creditFooter}>
            <Text style={styles.portfolioText}>Pledged MF Portfolio: ₹4,80,000</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)/shop')}
              style={styles.shopNowBtn}
            >
              <Text style={styles.shopNowText}>Shop Now</Text>
              <ArrowRight size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Shortcut to Marketplace */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/marketplace')}
          style={[styles.bannerCard, shadows.sm]}
        >
          <View style={styles.bannerLeft}>
            <View style={styles.bannerPill}>
              <Sparkles size={12} color={colors.primary} />
              <Text style={styles.bannerPillText}>New Launch</Text>
            </View>
            <Text style={styles.bannerTitle}>1Fi Marketplace</Text>
            <Text style={styles.bannerDesc}>
              Buy latest smartphones, laptops & TVs on No Cost EMI
            </Text>
          </View>
          <View style={styles.arrowCircle}>
            <ChevronRight size={20} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Recent Activity summary */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active EMIs</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/emi-dues')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.infoCard, shadows.sm]}>
          <View style={styles.infoRow}>
            <CreditCard size={20} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.infoTitle}>Sony WH-1000XM5 ANC</Text>
              <Text style={styles.infoSubtitle}>Auto-debit on 5th Oct • 4 of 6 paid</Text>
            </View>
            <Text style={styles.infoAmount}>₹4,831</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: 110,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greetingText: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
  },
  subGreeting: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  creditCard: {
    backgroundColor: '#6022CD',
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    gap: 4,
  },
  badgeText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  activeText: {
    fontSize: typography.sizes.xs,
    color: '#86EFAC',
    fontWeight: typography.weights.bold,
  },
  creditLabel: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  creditAmount: {
    fontSize: typography.sizes.hero,
    fontWeight: typography.weights.extrabold,
    color: colors.textInverse,
    marginVertical: spacing.xs,
  },
  creditFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    paddingTop: spacing.md,
  },
  portfolioText: {
    fontSize: typography.sizes.xxs,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  shopNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    gap: 4,
  },
  shopNowText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primarySoft,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderPurple,
    marginBottom: spacing.xl,
  },
  bannerLeft: {
    flex: 1,
  },
  bannerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.pill,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
    gap: 3,
  },
  bannerPillText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  bannerTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
  },
  bannerDesc: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.pill,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  viewAllText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  infoSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  infoAmount: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
});
