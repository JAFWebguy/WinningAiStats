import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with clsx and tailwind-merge for conditional class application
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number with commas for better readability
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

/**
 * Formats a currency value with $ symbol and commas
 */
export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}

/**
 * Formats a percentage value with % symbol
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`
}

/**
 * Shortens a large number to a readable format with suffix (K, M, B, T)
 */
export function formatShortNumber(value: number): string {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(1)}T`
  }
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return formatNumber(value)
}
