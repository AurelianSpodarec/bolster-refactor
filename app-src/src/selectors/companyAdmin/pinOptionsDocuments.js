export const selectPinOptionDocuments = state =>
    state.companyAdmin.pinOptionDocumentsReducer.documents;
export const selectPinOptionDocumentsArr = state => Object.values(selectPinOptionDocuments(state));
export const selectPinOptionDocument = (state, documentID) =>
    state.companyAdmin.pinOptionDocumentsReducer.documents[documentID] || {};

export const selectPinOptionDocumentsIsFetching = state =>
    state.companyAdmin.pinOptionDocumentsReducer.isFetching;
export const selectPinOptionDocumentsFetchError = state =>
    state.companyAdmin.pinOptionDocumentsReducer.fetchError;
export const selectPinOptionDocumentsIsPosting = state =>
    state.companyAdmin.pinOptionDocumentsReducer.isPosting;
export const selectPinOptionDocumentsPostError = state =>
    state.companyAdmin.pinOptionDocumentsReducer.postError;
export const selectPinOptionDocumentsPostSuccess = state =>
    state.companyAdmin.pinOptionDocumentsReducer.postSuccess;
