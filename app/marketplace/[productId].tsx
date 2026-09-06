import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Share2, Heart, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { Screen } from '../../src/components/common/Screen';
import { Header } from '../../src/components/common/Header';
import { VariantSelector } from '../../src/components/marketplace/VariantSelector';
import { EmiPlanList } from '../../src/components/marketplace/EmiPlanList';
import { ProductInfo } from '../../src/components/marketplace/ProductInfo';
import { Button } from '../../src/components/common/Button';
import { ErrorState } from '../../src/components/common/ErrorState';
import { Skeleton } from '../../src/components/common/SkeletonLoader';
import { useProduct } from '../../src/hooks/useProduct';
import { Variant, EmiPlan } from '../../src/types/product';
import { calculateEmiPlansForPrice } from '../../src/utils/emi';
import { formatCurrency } from '../../src/utils/currency';
import { colors } from '../../src/constants/colors';
import { spacing, borderRadius, shadows } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();

  const { data: product, isLoading, isError, refetch } = useProduct(productId);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiPlan | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  // Initialize selected variant and default EMI plan when product loads
  useEffect(() => {
    if (product) {
      const defaultVariant = product.variants?.[0] || {
        id: 'default',
        name: 'Standard',
        price: product.price,
        originalPrice: product.originalPrice,
      };
      setSelectedVariant(defaultVariant);

      // Default to 6-month or first available EMI plan
      const defaultPlan =
        product.emiPlans?.find((p) => p.months === 6) ||
        product.emiPlans?.[0] ||
        null;
      setSelectedEmiPlan(defaultPlan);
    }
  }, [product]);

  // Dynamically recalculate EMI plans if the user chooses a different variant price
  const dynamicEmiPlans = useMemo(() => {
    if (!product || !selectedVariant) return [];
    // If variant price is the same as product base price, use product's custom plans
    if (selectedVariant.price === product.price && product.emiPlans?.length > 0) {
      return product.emiPlans;
    }
    // Otherwise calculate dynamically for the new variant price
    return calculateEmiPlansForPrice(selectedVariant.price);
  }, [product, selectedVariant]);

  // Ensure selected EMI plan is updated when variant changes
  useEffect(() => {
    if (dynamicEmiPlans.length > 0) {
      const currentMonths = selectedEmiPlan?.months || 6;
      const matchingPlan =
        dynamicEmiPlans.find((p) => p.months === currentMonths) ||
        dynamicEmiPlans[0];
      setSelectedEmiPlan(matchingPlan);
    }
  }, [dynamicEmiPlans]);

  const handleShare = async () => {
    if (!product) return;
    try {
      await Share.share({
        message: `Check out ${product.name} on 1Fi Marketplace at 0% No Cost EMI!`,
      });
    } catch {
      // Ignored
    }
  };

  const handleProceed = () => {
    if (!product || !selectedVariant || !selectedEmiPlan) return;

    router.push({
      pathname: '/confirmation',
      params: {
        productName: product.name,
        brand: product.brand,
        productImage: product.image,
        variantName: selectedVariant.name,
        productPrice: selectedVariant.price.toString(),
        months: selectedEmiPlan.months.toString(),
        monthlyAmount: selectedEmiPlan.monthlyAmount.toString(),
        totalAmount: selectedEmiPlan.totalAmount.toString(),
        isNoCost: selectedEmiPlan.isNoCost ? 'true' : 'false',
      },
    });
  };

  if (isLoading) {
    return (
      <Screen edges={['top', 'left', 'right']}>
        <Header showBack title="Loading Product..." />
        <View style={{ padding: spacing.lg, gap: spacing.md }}>
          <Skeleton height={260} radius={borderRadius.xxl} />
          <Skeleton width="40%" height={16} />
          <Skeleton width="90%" height={24} />
          <Skeleton width="50%" height={28} />
          <Skeleton height={120} radius={borderRadius.xl} />
          <Skeleton height={160} radius={borderRadius.xl} />
        </View>
      </Screen>
    );
  }

  if (isError || !product) {
    return (
      <Screen edges={['top', 'left', 'right']}>
        <Header showBack title="Product Details" />
        <ErrorState
          title="Product Not Found"
          message="We couldn't load the details for this product. It may no longer be available."
          onRetry={refetch}
        />
      </Screen>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <Screen edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header
        showBack
        title={product.brand}
        rightElement={
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => setIsLiked(!isLiked)}
              activeOpacity={0.7}
              style={styles.actionIcon}
            >
              <Heart
                size={20}
                color={isLiked ? colors.error : colors.textPrimary}
                fill={isLiked ? colors.error : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              activeOpacity={0.7}
              style={styles.actionIcon}
            >
              <Share2 size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Image Stage */}
        <View style={[styles.imageContainer, shadows.sm]}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {product.discountPercentage ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {product.discountPercentage}% OFF
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.bodyContent}>
          {/* Product Info & Specs */}
          <ProductInfo product={product} selectedVariant={selectedVariant || undefined} />

          {/* Mutual Fund Advantage Banner */}
          <View style={[styles.mfBanner, shadows.sm]}>
            <ShieldCheck size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.mfBannerTitle}>1Fi Portfolio Backed Financing</Text>
              <Text style={styles.mfBannerDesc}>
                Zero impact on your mutual fund returns. Funds stay invested while compounding.
              </Text>
            </View>
          </View>

          {/* Variant Selector */}
          {selectedVariant && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
          )}

          {/* EMI Plans Selection */}
          <EmiPlanList
            plans={dynamicEmiPlans}
            selectedPlan={selectedEmiPlan || undefined}
            onSelectPlan={setSelectedEmiPlan}
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={[styles.bottomBar, shadows.lg]}>
        <View style={styles.bottomSummary}>
          <Text style={styles.bottomLabel}>
            {selectedEmiPlan ? `${selectedEmiPlan.months} Months EMI` : 'Total Price'}
          </Text>
          <Text style={styles.bottomAmount}>
            {selectedEmiPlan
              ? `${formatCurrency(selectedEmiPlan.monthlyAmount)} / mo`
              : formatCurrency(currentPrice)}
          </Text>
        </View>

        <Button
          title="Proceed with EMI"
          onPress={handleProceed}
          disabled={!selectedEmiPlan}
          rightIcon={<ArrowRight size={18} color={colors.textInverse} />}
          style={styles.proceedButton}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    width: SCREEN_WIDTH - spacing.lg * 2,
    height: 280,
    backgroundColor: colors.cardBackground,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  bodyContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  mfBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderPurple,
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  mfBannerTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
  },
  mfBannerDesc: {
    fontSize: typography.sizes.xxs,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  bottomSummary: {
    flex: 1,
  },
  bottomLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: typography.weights.medium,
  },
  bottomAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.extrabold,
    color: colors.primaryDark,
  },
  proceedButton: {
    flex: 1.3,
  },
});
