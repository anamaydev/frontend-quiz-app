export function getIconUrl(iconPath){
  return new URL(iconPath, import.meta.url).href;
}