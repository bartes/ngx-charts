/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns boolean
 * @param results
 * @param item
 */
export function isRelatedEntry(relatedEntries, entryName): boolean {
  if(!relatedEntries) {
    return false;
  }
  const item = relatedEntries.find(d => {
    return entryName === d.name;
  });
  return item !== undefined;
}

/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 * @param excluded
 */

export function getUniqueXDomainValues(results: any[], excluded?: any[]): any[] {
  const valueSet = new Set();
  for (const result of results) {
    if ( excluded && isRelatedEntry(excluded, result.name) ) {
      continue;
    }
    for (const d of result.series) {
      valueSet.add(d.name);
    }
  }
  return Array.from(valueSet);
}
