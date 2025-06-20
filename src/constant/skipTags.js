// Теги, которые нужно игнорировать
export const SKIP_TAGS = new Set([
  "script",
  "style",
  "svg",
  "noscript",
  "template",
  "code",
  "head",
  "meta",
  "link",
  "br",
  "hr",
  "iframe",
]);

// Классы и атрибуты для пропуска
export const SKIP_CLASSES = new Set(["visually-hidden", "sr-only", "hidden"]);

// Роли ARIA для пропуска
export const SKIP_ROLES = new Set(["presentation", "none"]);
