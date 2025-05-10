// export function getIconUrl(iconPath){
//   const baseURL = import.meta.env.BASE_URL || '/';
//   return new URL(iconPath, baseURL).href;
//   return new URL(iconPath, import.meta.env.BASE_URL).href;
//   return new URL(iconPath, import.meta.url).href;
// }

export function getIconUrl(iconPath) {
  // Use relative path for production
  return process.env.NODE_ENV === 'production'
    ? `${process.env.PUBLIC_URL || ''}/${iconPath}`
    : new URL(iconPath, import.meta.url).href;
}