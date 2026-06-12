export function sanitizeString(value) {
  if (value == null) return "";
  return String(value)
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "");
}

export function sanitizeOptionalString(value) {
  const sanitized = sanitizeString(value);
  return sanitized.length === 0 ? undefined : sanitized;
}

export function sanitizeEmail(value) {
  return sanitizeString(value).toLowerCase();
}

export function parseDate(value) {
  const sanitized = sanitizeString(value);
  if (!sanitized) return undefined;

  const date = new Date(sanitized);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function parseFloatValue(value) {
  const sanitized = sanitizeString(value);
  const parsed = Number(sanitized);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function parseIntegerValue(value) {
  const sanitized = sanitizeString(value);
  const parsed = Number(sanitized);
  return Number.isNaN(parsed) ? undefined : parsed;
}
