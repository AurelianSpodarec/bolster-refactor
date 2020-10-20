export function getSortedDropdownOptions(options) {
    return [...options].sort((a, b) => a.sort - b.sort);
}
