export const removeDeletedDocumentVersion = (documentsObj, documentID, versionID) => {
    const updatedVersionsArr = documentsObj[documentID].versions.filter(
        version => version.id !== versionID,
    );

    return {
        ...documentsObj,
        [documentID]: { ...documentsObj[documentID], versions: updatedVersionsArr },
    };
};
