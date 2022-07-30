export const selectPayRates = state => state.companyAdmin.payRatesReducer.payRates;
export const selectPayRatesIsFetching = state => state.companyAdmin.payRatesReducer.isFetching;
export const selectPayRatesError = state => state.companyAdmin.payRatesReducer.error;
export const selectPayRatesIsPosting = state => state.companyAdmin.payRatesReducer.isPosting;
export const selectPayRatesPostSuccess = state => state.companyAdmin.payRatesReducer.postSuccess;
