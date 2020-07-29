import { DEFAULT_PIN_OPTIONS_SORT } from 'constants/companyAdmin/enums';

export function getSortedDropdownOptions(options, defaultDropdownSorting) {
    const { NAME_ASC, NAME_DESC, DATE_ASC, DATE_DESC } = DEFAULT_PIN_OPTIONS_SORT;

    if (+defaultDropdownSorting === NAME_ASC) {
        return [...options].sort((a, b) => a.label - b.label);
    }

    if (+defaultDropdownSorting === NAME_DESC) {
        return [...options].sort((a, b) =>
            b.label.localeCompare(a.label, undefined, { numeric: true, sensitivity: 'base' }),
        );
    }

    if (+defaultDropdownSorting === DATE_ASC) {
        return [...options].sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    }

    if (+defaultDropdownSorting === DATE_DESC) {
        return [...options].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    }

    return [...options].sort((a, b) => a.sort - b.sort);
}
