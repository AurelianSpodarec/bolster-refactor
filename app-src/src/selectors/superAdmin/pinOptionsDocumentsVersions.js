export const selectPinOptionDocumentsVersions = state =>
    state.superAdmin.pinOptionDocumentsVersionsReducer.documentsVersions;
export const selectPinOptionDocumentsVersionsArr = state =>
    Object.values(selectPinOptionDocumentsVersions(state));

export const selectPinOptionDocumentsVersionsIsFetching = state =>
    state.superAdmin.pinOptionDocumentsVersionsReducer.isFetching;
export const selectPinOptionDocumentsVersionsFetchError = state =>
    state.superAdmin.pinOptionDocumentsVersionsReducer.fetchError;
export const selectPinOptionDocumentsVersionsIsPosting = state =>
    state.superAdmin.pinOptionDocumentsVersionsReducer.isPosting;
export const selectPinOptionDocumentsVersionsPostError = state =>
    state.superAdmin.pinOptionDocumentsVersionsReducer.postError;
export const selectPinOptionDocumentsVersionsPostSuccess = state =>
    state.superAdmin.pinOptionDocumentsVersionsReducer.postSuccess;
