import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  radius = borderRadius.sm,
  style,
}) => {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacityAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width as any,
          height,
          borderRadius: radius,
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={styles.cardSkeleton}>
      <Skeleton height={140} radius={borderRadius.lg} style={styles.imageSkeleton} />
      <View style={styles.cardContent}>
        <Skeleton width="40%" height={12} radius={borderRadius.xs} />
        <Skeleton width="90%" height={16} radius={borderRadius.xs} style={{ marginTop: 6 }} />
        <Skeleton width="60%" height={18} radius={borderRadius.xs} style={{ marginTop: 10 }} />
        <Skeleton width="75%" height={14} radius={borderRadius.xs} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.gridItem}>
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
};

export const StoreSkeleton: React.FC = () => {
  return (
    <View style={styles.storeSkeleton}>
      <Skeleton width={56} height={56} radius={borderRadius.lg} />
      <View style={{ flex: 1, marginLeft: spacing.md, gap: 6 }}>
        <Skeleton width="60%" height={16} radius={borderRadius.xs} />
        <Skeleton width="40%" height={12} radius={borderRadius.xs} />
        <Skeleton width="80%" height={12} radius={borderRadius.xs} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.skeletonBase,
  },
  cardSkeleton: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  imageSkeleton: {
    marginBottom: spacing.sm,
  },
  cardContent: {
    gap: spacing.xs,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    paddingHorizontal: spacing.md,
  },
  gridItem: {
    width: '50%',
    padding: spacing.xs,
  },
  storeSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
});
