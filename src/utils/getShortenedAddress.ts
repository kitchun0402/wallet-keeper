/**
 * Returns a shortened version of the given address.
 * @param address - The address to be shortened.
 * @param trimStart - The number of characters to keep from the start of the address. Default is 6.
 * @param trimEnd - The number of characters to keep from the end of the address. Default is 4.
 * @returns The shortened address.
 */
export function getShortenedAddress(
  address: string,
  trimStart = 6,
  trimEnd = 4,
): string {
  return `${address.substring(0, trimStart)}...${address.substring(
    address.length - trimEnd,
    address.length,
  )}`
}
