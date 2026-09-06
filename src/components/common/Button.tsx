import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing, shadows } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  const containerStyles: StyleProp<ViewStyle>[] = [
    styles.base,
    styles[size],
    isPrimary && styles.primary,
    isSecondary && styles.secondary,
    isOutline && styles.outline,
    isGhost && styles.ghost,
    isPrimary && !disabled && shadows.purpleGlow,
    disabled && styles.disabled,
    style,
  ];

  const textStyles: StyleProp<TextStyle>[] = [
    styles.baseText,
    styles[`${size}Text`],
    isPrimary && styles.primaryText,
    isSecondary && styles.secondaryText,
    isOutline && styles.outlineText,
    isGhost && styles.ghostText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary ? colors.textInverse : colors.primary}
        />
      ) : (
        <>
          {leftIcon}
          <Text style={textStyles}>{title}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.pill,
    gap: spacing.sm,
  },
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    height: 38,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    height: 48,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    height: 56,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryMuted,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.border,
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  baseText: {
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
  smText: {
    fontSize: typography.sizes.sm,
  },
  mdText: {
    fontSize: typography.sizes.base,
  },
  lgText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  primaryText: {
    color: colors.textInverse,
  },
  secondaryText: {
    color: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.textSecondary,
  },
  disabledText: {
    color: colors.textPlaceholder,
  },
});
