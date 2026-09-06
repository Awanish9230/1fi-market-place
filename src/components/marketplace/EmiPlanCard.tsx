import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Sparkles, ShieldCheck } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { EmiPlan } from '../../types/product';
import { formatCurrency } from '../../utils/currency';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

export const EmiPlanCard: React.FC<EmiPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onSelect(plan)}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        isSelected && shadows.sm,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.tenureContainer}>
          <Text style={[styles.months, isSelected && styles.monthsSelected]}>
            {plan.months} Months
          </Text>
          {plan.badge && (
            <View
              style={[
                styles.badge,
                plan.isNoCost ? styles.noCostBadge : styles.genericBadge,
              ]}
            >
              {plan.isNoCost && <Sparkles size={10} color={colors.primary} />}
              <Text
                style={[
                  styles.badgeText,
                  plan.isNoCost ? styles.noCostBadgeText : styles.genericBadgeText,
                ]}
              >
                {plan.badge}
              </Text>
            </View>
          )}
        </View>

        <View
          style={[
            styles.radioCircle,
            isSelected && styles.radioCircleSelected,
          ]}
        >
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </View>

      <View style={styles.amountRow}>
        <View>
          <Text style={[styles.monthlyAmount, isSelected && styles.monthlyAmountSelected]}>
            {formatCurrency(plan.monthlyAmount)}
            <Text style={styles.perMonthText}> / month</Text>
          </Text>
          <Text style={styles.totalAmount}>
            Total: {formatCurrency(plan.totalAmount)}
            {plan.isNoCost ? ' (0% Interest)' : ` (${plan.interestRate}% p.a.)`}
          </Text>
        </View>

        {plan.isNoCost && (
          <View style={styles.verifiedTag}>
            <ShieldCheck size={14} color={colors.success} />
            <Text style={styles.verifiedText}>Zero extra cost</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tenureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  months: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  monthsSelected: {
    color: colors.primaryDark,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.pill,
    gap: 3,
  },
  noCostBadge: {
    backgroundColor: '#EDE9FE',
  },
  genericBadge: {
    backgroundColor: colors.surfaceAlt,
  },
  badgeText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
  },
  noCostBadgeText: {
    color: colors.primaryDark,
  },
  genericBadgeText: {
    color: colors.textSecondary,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: borderRadius.pill,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.cardBackground,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  monthlyAmount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
  },
  monthlyAmountSelected: {
    color: colors.primaryDark,
  },
  perMonthText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textMuted,
  },
  totalAmount: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  verifiedText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
});
