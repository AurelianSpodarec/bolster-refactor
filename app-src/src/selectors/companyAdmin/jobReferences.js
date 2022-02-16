export const selectJobReferences = state => state.companyAdmin.jobReferencesReducer.jobReferences;

export const selectJobReferencesIsFetching = state =>
    state.companyAdmin.jobReferencesReducer.isFetching;
export const selectJobReferencesFetchError = state =>
    state.companyAdmin.jobReferencesReducer.fetchError;

export const selectJobReferencesIsPosting = state =>
    state.companyAdmin.jobReferencesReducer.isPosting;
export const selectJobReferencesPostSuccess = state =>
    state.companyAdmin.jobReferencesReducer.postSuccess;
export const selectJobReferencesPostError = state =>
    state.companyAdmin.jobReferencesReducer.postError;
