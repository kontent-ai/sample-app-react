export function resolveChangeLanguageLink(
  path: string,
  language: string
): string {
  const pathArray = path.split('/');
  pathArray[1] = language.toLowerCase();
  return pathArray.join('/');
}
