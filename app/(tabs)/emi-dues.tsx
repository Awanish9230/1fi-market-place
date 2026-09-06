import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Receipt, Calendar, CheckCircle } from 'lucide-react-native';
import { Screen } from '../../src/components/common/Screen';
import { Header } from '../../src/components/common/Header';
import { colors } from '../../src/constants/colors';
import { spacing, borderRadius, shadows } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { formatCurrency } from '../../src/utils/currency';

export default function EmiDuesScreen() {
  return (
    <Screen scrollable edges={['top', 'left', 'right']}>
      <Header title="EMI Dues" subtitle="Track and manage upcoming payments" />

      <View style={styles.container}>
        {/* Next Due Summary Card */}
        <View style={[styles.dueCard, shadows.sm]}>
          <View style={styles.dueHeader}>
            <View style={styles.badge}>
              <Calendar size={14} color={colors.primary} />
              <Text style={styles.badgeText}>Next Due Date</Text>
            </View>
            <Text style={styles.dateText}>05 Oct 2026</Text>
          </View>

          <Text style={styles.dueLabel}>Total Upcoming Amount</Text>
          <Text style={styles.dueAmount}>{formatCurrency(4831)}</Text>
          <Text style={styles.dueNote}>Auto-debit scheduled from HDFC Bank •••• 4092</Text>
        </View>

        {/* Active EMI List */}
        <Text style={styles.sectionTitle}>Active Subscriptions & EMIs</Text>

        <View style={[styles.planCard, shadows.sm]}>
          <View style={styles.planHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.planName}>Sony WH-1000XM5 ANC</Text>
              <Text style={styles.planTenure}>6 Months No Cost EMI • Loan #1FI-8821</Text>
            </View>
            <View style={styles.statusBadge}>
              <CheckCircle size={12} color={colors.success} />
              <Text style={styles.statusText}>On Track</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '66%' }]} />
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>4 of 6 EMIs Paid</Text>
              <Text style={styles.progressAmount}>Remaining: {formatCurrency(9662)}</Text>
            </View>
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
  dueCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.xl,
  },
  dueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
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
  dateText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  dueLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  dueAmount: {
    fontSize: typography.sizes.hero,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
    marginVertical: 4,
  },
  dueNote: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  planCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  planName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  planTenure: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.pill,
  },
  statusText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  progressSection: {
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.pill,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.pill,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: typography.sizes.xxs,
    color: colors.textMuted,
  },
  progressAmount: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
});
