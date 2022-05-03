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

export const selectCostingAndEstimatingIsPosting = state =>
    state.companyAdmin.costingAndEstimatingReducer.isPosting;
export const selectCostingAndEstimatingPostError = state =>
    state.companyAdmin.costingAndEstimatingReducer.postError;
export const selectCostingAndEstimatingPostSuccess = state =>
    state.companyAdmin.costingAndEstimatingReducer.postSuccess;
