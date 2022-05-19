export const selectPinOptionDocuments = state =>
    state.superAdmin.pinOptionDocumentsReducer.documents;
export const selectPinOptionDocumentsArr = state => Object.values(selectPinOptionDocuments(state));
export const selectPinOptionDocument = (state, documentID) =>
    state.superAdmin.pinOptionDocumentsReducer.documents[documentID] || {};

export const selectPinOptionDocumentsIsFetching = state =>
    state.superAdmin.pinOptionDocumentsReducer.isFetching;
export const selectPinOptionDocumentsFetchError = state =>
    state.superAdmin.pinOptionDocumentsReducer.fetchError;
export const selectPinOptionDocumentsIsPosting = state =>
    state.superAdmin.pinOptionDocumentsReducer.isPosting;
export const selectPinOptionDocumentsPostError = state =>
    state.superAdmin.pinOptionDocumentsReducer.postError;
export const selectPinOptionDocumentsPostSuccess = state =>
    state.superAdmin.pinOptionDocumentsReducer.postSuccess;
