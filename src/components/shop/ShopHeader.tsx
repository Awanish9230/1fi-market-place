import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, ChevronDown, Bell } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface ShopHeaderProps {
  location?: string;
  onLocationPress?: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  location = 'Indiranagar, Bengaluru',
  onLocationPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require('../../../assets/1fi-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.greeting}>Shop with 1Fi</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onLocationPress}
            style={styles.locationSelector}
          >
            <MapPin size={14} color={colors.primary} />
            <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
            <ChevronDown size={14} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.iconButton}
      >
        <Bell size={20} color={colors.textPrimary} />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
  },
  greeting: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  locationText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
    maxWidth: 180,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary,
  },
});
