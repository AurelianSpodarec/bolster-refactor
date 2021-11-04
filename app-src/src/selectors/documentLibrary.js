export const selectDocumentLibrary = state =>
    state.companyAdmin.documentLibraryReducer.documentLibrary;
export const selectDocumentLibraryIsFetching = state =>
    state.companyAdmin.documentLibraryReducer.isFetching;
export const selectDocumentLibraryFetchError = state =>
    state.companyAdmin.documentLibraryReducer.fetchError;
export const selectDocumentLibraryStorageInformation = state =>
    state.companyAdmin.documentLibraryReducer.storageInformation;
