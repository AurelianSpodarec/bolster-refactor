const useReferences = clockerEntries => {
    return clockerEntries.reduce((acc, entry) => {
        if (!entry.jobReference || acc.includes(entry.jobReference)) return acc;
        return [...acc, entry.jobReference];
    }, []);
};

export default useReferences;
