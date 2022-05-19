export const selectPinOptionDocumentsVersions = state =>
    state.companyAdmin.pinOptionDocumentsVersionsReducer.documentsVersions;
export const selectPinOptionDocumentsVersionsArr = state =>
    Object.values(selectPinOptionDocumentsVersions(state));

export const selectPinOptionDocumentsVersionsIsFetching = state =>
    state.companyAdmin.pinOptionDocumentsVersionsReducer.isFetching;
export const selectPinOptionDocumentsVersionsFetchError = state =>
    state.companyAdmin.pinOptionDocumentsVersionsReducer.fetchError;
export const selectPinOptionDocumentsVersionsIsPosting = state =>
    state.companyAdmin.pinOptionDocumentsVersionsReducer.isPosting;
export const selectPinOptionDocumentsVersionsPostError = state =>
    state.companyAdmin.pinOptionDocumentsVersionsReducer.postError;
export const selectPinOptionDocumentsVersionsPostSuccess = state =>
    state.companyAdmin.pinOptionDocumentsVersionsReducer.postSuccess;
