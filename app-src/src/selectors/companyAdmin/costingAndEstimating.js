export const selectCostingAndEstimatingResultsIsFetching = state =>
    state.companyAdmin.costingAndEstimatingReducer.isFetchingResults;
export const selectCostingAndEstimatingFiltersIsFetching = state =>
    state.companyAdmin.costingAndEstimatingReducer.isFetchingFilters;
export const selectCostingAndEstimatingFetchError = state =>
    state.companyAdmin.costingAndEstimatingReducer.error;
export const selectCostingAndEstimatingResults = state =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingResults;
export const selectCostingAndEstimatingFilters = state =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingFilters;

// prelims
export const selectPrelimsArr = state =>
    Object.values(state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingPrelims || {});
export const selectSinglePrelim = (state, id) =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingPrelims[id];

export const selectCostingAndEstimatingIsPosting = state =>
    state.companyAdmin.costingAndEstimatingReducer.isPosting;
export const selectCostingAndEstimatingPostError = state =>
    state.companyAdmin.costingAndEstimatingReducer.postError;
export const selectCostingAndEstimatingPostSuccess = state =>
    state.companyAdmin.costingAndEstimatingReducer.postSuccess;
