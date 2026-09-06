import { EmiPlan } from '../types/product';
import { formatCurrency } from './currency';

/**
 * Get starting EMI string for a list of plans (e.g. "From ₹4,999/mo")
 */
export function getStartingEmiText(emiPlans: EmiPlan[]): string {
  if (!emiPlans || emiPlans.length === 0) return '';
  const lowest = Math.min(...emiPlans.map((p) => p.monthlyAmount));
  return `From ${formatCurrency(lowest)}/mo`;
}

/**
 * Recalculate EMI plans dynamically for a specific variant price
 */
export function calculateEmiPlansForPrice(price: number): EmiPlan[] {
  const tenures = [
    { months: 3, isNoCost: true, badge: 'No Cost EMI', interestRate: 0 },
    { months: 6, isNoCost: true, badge: 'Most Popular', interestRate: 0 },
    { months: 9, isNoCost: false, badge: 'Flexible Tenure', interestRate: 14 },
    { months: 12, isNoCost: false, badge: 'Lowest Monthly', interestRate: 15 },
  ];

  return tenures.map((item, index) => {
    let monthlyAmount: number;
    let totalAmount: number;

    if (item.interestRate === 0) {
      monthlyAmount = Math.round(price / item.months);
      totalAmount = monthlyAmount * item.months;
    } else {
      const r = item.interestRate / 12 / 100;
      const n = item.months;
      const emi = (price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      monthlyAmount = Math.round(emi);
      totalAmount = monthlyAmount * item.months;
    }

    return {
      id: `${item.months}m`,
      months: item.months,
      monthlyAmount,
      totalAmount,
      interestRate: item.interestRate,
      isNoCost: item.isNoCost,
      badge: item.badge,
      processingFee: item.isNoCost ? 0 : 199,
    };
  });
}
