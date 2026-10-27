export const siteBase = import.meta.env?.BASE_URL ?? '/';

export function toSiteUrl(value, base = siteBase) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return value;
  return `${base.replace(/\/?$/, '/')}${value.slice(1)}`;
}

export function fromSitePath(pathname, base = siteBase) {
  if (base === '/') return pathname;
  const prefix = base.replace(/\/$/, '');
  if (pathname === prefix) return '/';
  return pathname.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : pathname;
}
