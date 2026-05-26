// Format a date to a readable string
export function formatDate(date: Date, format: 'short' | 'long' | 'year' = 'long'): string {
  if (format === 'year') return date.getFullYear().toString();
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Format date as ISO string for <time> datetime attribute
export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Estimate reading time from word count
export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// Group items by year
export function groupByYear<T extends { data: { date: Date } }>(items: T[]): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const year = item.data.date.getFullYear().toString();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(item);
  }
  return groups;
}

// Sort by date descending
export function sortByDate<T extends { data: { date: Date } }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Get all unique tags from a collection
export function getAllTags<T extends { data: { tags: string[] } }>(items: T[]): string[] {
  const tagSet = new Set<string>();
  for (const item of items) {
    item.data.tags.forEach(tag => tagSet.add(tag));
  }
  return Array.from(tagSet).sort();
}

// Filter out drafts in production
export function filterDrafts<T extends { data: { draft: boolean } }>(items: T[]): T[] {
  if (import.meta.env.PROD) {
    return items.filter(item => !item.data.draft);
  }
  return items;
}

// Slugify a string
export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

// Truncate text
export function truncate(text: string, length = 160): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '…';
}
