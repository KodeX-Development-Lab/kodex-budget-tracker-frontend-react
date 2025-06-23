import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapToLabelValue<T extends { id: number; name: string }>(
  items?: T[] | null
): { label: string; value: number }[] {
  if (!items || !Array.isArray(items)) return []

  return items.map((item) => ({
    label: item.name,
    value: item.id,
  }))
}
