import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EmiPlan } from '../../types/product';
import { EmiPlanCard } from './EmiPlanCard';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface EmiPlanListProps {
  plans: EmiPlan[];
  selectedPlan?: EmiPlan;
  onSelectPlan: (plan: EmiPlan) => void;
}

export const EmiPlanList: React.FC<EmiPlanListProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose EMI Plan</Text>
        <Text style={styles.subtitle}>Instant credit backed by your MF limit</Text>
      </View>

      <View style={styles.list}>
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  list: {
    gap: spacing.xs,
  },
});
