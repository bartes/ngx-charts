/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns boolean
 * @param results
 * @param item
 */
export function isRelatedEntry(relatedEntries, entryName) {
    if (!relatedEntries) {
        return false;
    }
    var item = relatedEntries.find(function (d) {
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
export function getUniqueXDomainValues(results, excluded) {
    var valueSet = new Set();
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var result = results_1[_i];
        if (excluded && isRelatedEntry(excluded, result.name)) {
            continue;
        }
        for (var _a = 0, _b = result.series; _a < _b.length; _a++) {
            var d = _b[_a];
            valueSet.add(d.name);
        }
    }
    return Array.from(valueSet);
}
//# sourceMappingURL=domain.helper.js.map