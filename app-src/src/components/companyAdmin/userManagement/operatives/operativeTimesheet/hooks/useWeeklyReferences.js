const useWeeklyReferences = entries => {
    let references = [];

    for (let i = 0; i < entries.length; i++) {
        if (entries[i].clockerEntries.length) {
            references.push(entries[i].clockerEntries);
        }
    }

    return references.flat().reduce((acc, entry) => {
        if (!entry.jobReference || acc.includes(entry.jobReference)) return acc;
        return [...acc, entry.jobReference];
    }, []);
};

export default useWeeklyReferences;
