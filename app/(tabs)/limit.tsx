import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldCheck, TrendingUp, RefreshCw } from 'lucide-react-native';
import { Screen } from '../../src/components/common/Screen';
import { Header } from '../../src/components/common/Header';
import { colors } from '../../src/constants/colors';
import { spacing, borderRadius, shadows } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { formatCurrency } from '../../src/utils/currency';

export default function LimitScreen() {
  return (
    <Screen scrollable edges={['top', 'left', 'right']}>
      <Header title="Mutual Fund Credit Limit" subtitle="Asset-backed borrowing power" />

      <View style={styles.container}>
        {/* Main Limit Card */}
        <View style={[styles.mainCard, shadows.md]}>
          <View style={styles.cardHeader}>
            <View style={styles.verifiedPill}>
              <ShieldCheck size={14} color={colors.primary} />
              <Text style={styles.verifiedText}>CAMS / KFintech Linked</Text>
            </View>
            <RefreshCw size={16} color="rgba(255,255,255,0.8)" />
          </View>

          <Text style={styles.limitLabel}>Approved Limit</Text>
          <Text style={styles.limitAmount}>{formatCurrency(250000)}</Text>

          <View style={styles.splitRow}>
            <View>
              <Text style={styles.splitLabel}>Utilized</Text>
              <Text style={styles.splitVal}>{formatCurrency(28990)}</Text>
            </View>
            <View style={styles.splitDivider} />
            <View>
              <Text style={styles.splitLabel}>Available to Spend</Text>
              <Text style={styles.splitValHighlight}>{formatCurrency(221010)}</Text>
            </View>
          </View>
        </View>

        {/* Pledged Funds Breakdown */}
        <Text style={styles.sectionTitle}>Pledged Folios</Text>

        <View style={[styles.folioCard, shadows.sm]}>
          <View style={styles.folioRow}>
            <TrendingUp size={20} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.folioName}>Mirae Asset Large Cap Fund - Direct (G)</Text>
              <Text style={styles.folioUnits}>Units: 1,420.5 • NAV: ₹112.4</Text>
            </View>
            <Text style={styles.folioValue}>{formatCurrency(159664)}</Text>
          </View>
        </View>

        <View style={[styles.folioCard, shadows.sm, { marginTop: spacing.sm }]}>
          <View style={styles.folioRow}>
            <TrendingUp size={20} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.folioName}>Parag Parikh Flexi Cap Fund - Direct (G)</Text>
              <Text style={styles.folioUnits}>Units: 4,820.0 • NAV: ₹66.5</Text>
            </View>
            <Text style={styles.folioValue}>{formatCurrency(320530)}</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  mainCard: {
    backgroundColor: '#6022CD',
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    gap: 4,
  },
  verifiedText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  limitLabel: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  limitAmount: {
    fontSize: typography.sizes.hero,
    fontWeight: typography.weights.extrabold,
    color: colors.textInverse,
    marginVertical: 4,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    paddingTop: spacing.md,
  },
  splitLabel: {
    fontSize: typography.sizes.xxs,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  splitVal: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textInverse,
    marginTop: 2,
  },
  splitValHighlight: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: '#86EFAC',
    marginTop: 2,
  },
  splitDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  folioCard: {
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  folioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  folioName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  folioUnits: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  folioValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
});
