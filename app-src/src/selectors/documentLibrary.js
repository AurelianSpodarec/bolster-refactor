export const selectDocumentLibrary = state =>
    state.companyAdmin.documentLibraryReducer.documentLibrary;
export const selectDocumentLibraryIsFetching = state =>
    state.companyAdmin.documentLibraryReducer.isFetching;
export const selectDocumentLibraryFetchError = state =>
    state.companyAdmin.documentLibraryReducer.fetchError;
export const selectDocumentLibraryIsPosting = state =>
    state.companyAdmin.documentLibraryReducer.isPosting;
export const selectDocumentLibraryPostError = state =>
    state.companyAdmin.documentLibraryReducer.postError;
export const selectDocumentLibraryPostSuccess = state =>
    state.companyAdmin.documentLibraryReducer.postSuccess;
export const selectDocumentLibraryStorageInformation = state =>
    state.companyAdmin.documentLibraryReducer.storageInformation;

export const selectDocumentLibrarySearchTerm = state =>
    state.companyAdmin.documentLibraryReducer.librarySearchTerm;
export const selectDocumentLibraryFilter = state =>
    state.companyAdmin.documentLibraryReducer.libraryFilter;
