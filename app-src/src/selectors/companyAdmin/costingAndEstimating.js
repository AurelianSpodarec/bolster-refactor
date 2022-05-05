export const selectCostingAndEstimatingResultsIsFetching = state =>
    state.companyAdmin.costingAndEstimatingReducer.isFetchingData;
export const selectCostingAndEstimatingCartIsFetching = state =>
    state.companyAdmin.costingAndEstimatingReducer.isFetchingCart;
export const selectCostingAndEstimatingFetchError = state =>
    state.companyAdmin.costingAndEstimatingReducer.error;
export const selectCostingAndEstimatingResults = state =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingResults;
export const selectCostingAndEstimatingCart = state =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingCart;

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
