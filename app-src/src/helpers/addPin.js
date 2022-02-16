export function getSortedDropdownOptions(options) {
    return [...options].sort((a, b) => {
        const aManSort = a.manufacturerSort || -1;
        const bManSort = b.manufacturerSort || -1;
        const manufacterSort = aManSort - bManSort;

        if (manufacterSort !== 0) return manufacterSort;
        return a.sort - b.sort;
    });
}

export const formatAnswers = (answers, options) => {
    if (!Array.isArray(answers)) {
        return [answers];
    }

    if (!answers || !Array.isArray(options)) return answers;

    const formattedOptions = options.map(({ value }) => value).filter(Boolean);

    const formattedAnswers = answers.filter(item => {
        return formattedOptions.includes(item);
    });

    return formattedAnswers;
};
