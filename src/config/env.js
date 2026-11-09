const apiBaseUrl = (
  // Vite exposes only VITE_-prefixed variables to browser code.
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).replace(/\/+$/, '');

export const env = Object.freeze({
  apiBaseUrl,
  mode: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
});

export function getApiUrl(path) {
  // Preserve absolute image URLs; resolve relative paths against the API host.
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${env.apiBaseUrl}/${path.replace(/^\/+/, '')}`;
}
