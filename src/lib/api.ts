export const apiUrl = (path: string) =>
  `/api${path.startsWith("/") ? path : `/${path}`}`;
