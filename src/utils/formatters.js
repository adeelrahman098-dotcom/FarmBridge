/**
 * Format amount into Bangladeshi Taka format: ৳ 12,500
 */
export function formatBDT(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '৳0';
  return `৳${Number(amount).toLocaleString('en-IN')}`;
}

/**
 * Format ISO date string into readable date: 15 Nov 2026
 */
export function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Format relative time (e.g. "10 mins ago", "2 hours ago")
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const now = new Date();
  const past = new Date(dateString);
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

/**
 * Financial breakdown calculation
 */
export function calculateFinancials(subtotal, deliveryFee = 0, commissionRate = 0.03) {
  const sub = Number(subtotal) || 0;
  const delivery = Number(deliveryFee) || 0;
  const commission = Math.round(sub * commissionRate);
  const farmerPayout = sub - commission;
  const totalPayable = sub + delivery;

  return {
    subtotal: sub,
    deliveryFee: delivery,
    commissionRate: commissionRate,
    commissionAmount: commission,
    farmerPayout: farmerPayout,
    totalPayable: totalPayable
  };
}
