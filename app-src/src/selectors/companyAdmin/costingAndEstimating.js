export const selectCostingAndEstimatingDataIsFetching = state =>
    state.companyAdmin.costingAndEstimatingReducer.isFetchingData;
export const selectCostingAndEstimatingCartIsFetching = state =>
    state.companyAdmin.costingAndEstimatingReducer.isFetchingCart;
export const selectCostingAndEstimatingFetchError = state =>
    state.companyAdmin.costingAndEstimatingReducer.error;
export const selectCostingAndEstimatingData = state =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingData;
export const selectCostingAndEstimatingCart = state =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingCart;

// prelims
export const selectPrelimsArr = state =>
    Object.values(state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingPrelims || {});
export const selectSinglePrelim = (state, id) =>
    state.companyAdmin.costingAndEstimatingReducer.costingAndEstimatingPrelims[id];

export const selectCostingAndEstimatingPrelimIsPosting = state =>
    state.companyAdmin.costingAndEstimatingReducer.isPosting;
export const selectCostingAndEstimatingPrelimPostError = state =>
    state.companyAdmin.costingAndEstimatingReducer.postError;
export const selectCostingAndEstimatingPrelimPostSuccess = state =>
    state.companyAdmin.costingAndEstimatingReducer.postSuccess;
