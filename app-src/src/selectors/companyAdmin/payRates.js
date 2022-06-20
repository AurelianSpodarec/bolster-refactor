export const selectPayRates = state => state.companyAdmin.payRatesReducer.payRates;
export const selectPayRatesIsFetching = state => state.companyAdmin.payRatesReducer.isFetching;
export const selectPayRatesError = state => state.companyAdmin.payRatesReducer.error;
