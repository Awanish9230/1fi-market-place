import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Shield, CreditCard, HelpCircle, FileText, ChevronRight } from 'lucide-react-native';
import { Screen } from '../../src/components/common/Screen';
import { Header } from '../../src/components/common/Header';
import { colors } from '../../src/constants/colors';
import { spacing, borderRadius, shadows } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';

const MENU_ITEMS = [
  { icon: Shield, label: 'KYC & Verification', value: 'Completed' },
  { icon: CreditCard, label: 'Linked Bank Accounts', value: 'HDFC •••• 4092' },
  { icon: FileText, label: 'Loan Agreements & KFS', value: '' },
  { icon: HelpCircle, label: 'Help & 24/7 Support', value: '' },
];

export default function ProfileScreen() {
  return (
    <Screen scrollable edges={['top', 'left', 'right']}>
      <Header title="Account & Profile" />

      <View style={styles.container}>
        {/* User Card */}
        <View style={[styles.userCard, shadows.sm]}>
          <View style={styles.avatar}>
            <User size={32} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>Awanish Kumar</Text>
            <Text style={styles.userPhone}>+91 98765 43210</Text>
            <Text style={styles.userEmail}>awanish@example.com</Text>
          </View>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Preferences & Settings</Text>

        <View style={[styles.menuList, shadows.sm]}>
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={[
                  styles.menuItem,
                  index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.iconCircle}>
                    <Icon size={18} color={colors.primary} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <View style={styles.menuRight}>
                  {item.value ? (
                    <Text style={styles.menuValue}>{item.value}</Text>
                  ) : null}
                  <ChevronRight size={18} color={colors.textPlaceholder} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  userPhone: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  userEmail: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  menuList: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuValue: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
});
