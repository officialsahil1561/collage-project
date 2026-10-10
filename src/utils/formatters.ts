/**
 * Formats an amount in Crores to standard, readable Indian financial notation.
 * e.g., 74427.41 -> ₹74,427.41 crore
 * e.g., 502.99 -> ₹502.99 crore
 * e.g., 0.42 -> ₹42.0 lakh
 * e.g., null -> "Not available in the sourced records"
 */
export function formatCrores(amountInCrores?: number | null): string {
  if (amountInCrores === undefined || amountInCrores === null || isNaN(amountInCrores)) {
    return 'Not available in the sourced records';
  }

  // If amount is small (under 1 crore), display in Lakhs
  if (amountInCrores > 0 && amountInCrores < 1) {
    const lakhs = amountInCrores * 100;
    return `₹${lakhs.toFixed(1)} lakh`;
  }

  return `₹${amountInCrores.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: amountInCrores % 1 !== 0 ? 2 : 0
  })} crore`;
}

/**
 * Returns exact currency value with Crores unit.
 */
export function formatCroresPrecise(amountInCrores?: number | null): string {
  if (amountInCrores === undefined || amountInCrores === null || isNaN(amountInCrores)) {
    return 'Not available in the sourced records';
  }
  return `₹${amountInCrores.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })} crore`;
}

/**
 * Formats normalized full INR amount in standard Indian notation.
 * e.g., 744274100000 -> ₹74,427,41,00,000
 */
export function formatNormalizedINR(amountInRupees?: number | null): string {
  if (amountInRupees === undefined || amountInRupees === null || isNaN(amountInRupees)) {
    return 'Not available';
  }
  return `₹${amountInRupees.toLocaleString('en-IN')}`;
}

/**
 * Formats printed amount and original unit cleanly
 */
export function formatPrintedWithUnit(amountStr: string, unitStr: string): string {
  return `₹${amountStr} ${unitStr}`;
}
