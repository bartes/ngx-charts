/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns boolean
 * @param results
 * @param item
 */
export declare function isRelatedEntry(relatedEntries: any, entryName: any): boolean;
/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 * @param excluded
 */
export declare function getUniqueXDomainValues(results: any[]): any[];
/**
 * Get the scaleType of enumerable of values.
 * @param values
 * @returns {string} 'time', 'linear' or 'ordinal'
 */
export declare function getScaleType(values: any[], checkDateType?: boolean): string;
