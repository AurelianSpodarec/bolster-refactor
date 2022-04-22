export function getSortedDropdownOptions(options) {
    return [...options].sort((a, b) => a.sort - b.sort);
}

export const formatAnswers = (answers, options) => {
    if (!answers || !Array.isArray(options)) return answers;

    const formattedOptions = options.map(({ value }) => value).filter(Boolean);

    return answers
        .map(item => item.pinOptionVersionID)
        .filter(versionID => formattedOptions.includes(versionID));
};
