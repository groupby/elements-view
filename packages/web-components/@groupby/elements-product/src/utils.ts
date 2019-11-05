/**
 *  Converts object properties to valid css classes. Makes
 *  a string lowercase and replaces spaces with hyphens.
 *
 *  @param str The string to process.
 *  @returns The lower case kebab string.
 *
 *  @internal
 */
// eslint-disable-next-line import/prefer-default-export
export function toLowerCaseKebab(str: string): string {
  return str.toLowerCase().replace(/\s/g, '-');
}
