export function getSortedDropdownOptions(options) {
    return [...options].sort((a, b) => a.sort - b.sort);
}

export const formatAnswers = (answers, options) => {
    if (!Array.isArray(answers)) {
        answers = [answers];
    }

    if (!answers || !Array.isArray(options)) return answers;

    const formattedOptions = options.map(({ value }) => value).filter(Boolean);

    const formattedAnswers = answers.filter(item => {
        return formattedOptions.includes(item);
    });

    return formattedAnswers;
};
