import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export type ShopTabType = 'top-brands' | 'nearby-stores' | 'marketplace';

interface ShopTabsProps {
  activeTab: ShopTabType;
  onTabChange: (tab: ShopTabType) => void;
}

interface TabItem {
  id: ShopTabType;
  label: string;
  badge?: string;
}

const TABS: TabItem[] = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace', badge: 'NEW' },
];

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.8}
              onPress={() => onTabChange(tab.id)}
              style={[
                styles.tab,
                isActive && styles.activeTab,
                isActive && shadows.sm,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
              {tab.badge && (
                <View
                  style={[
                    styles.badge,
                    isActive ? styles.activeBadge : styles.inactiveBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      isActive ? styles.activeBadgeText : styles.inactiveBadgeText,
                    ]}
                  >
                    {tab.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: spacing.sm,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.pill,
  },
  activeBadge: {
    backgroundColor: '#FFFFFF',
  },
  inactiveBadge: {
    backgroundColor: colors.primarySoft,
  },
  badgeText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.extrabold,
  },
  activeBadgeText: {
    color: colors.primary,
  },
  inactiveBadgeText: {
    color: colors.primary,
  },
});
