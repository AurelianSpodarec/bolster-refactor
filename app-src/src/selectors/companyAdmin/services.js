export const selectServicesIsFetching = state => state.companyAdmin.servicesReducer.isFetching;
export const selectServicesFetchError = state => state.companyAdmin.servicesReducer.error;
export const selectServices = state => state.companyAdmin.servicesReducer.services;
export const selectService = (state, id) => state.companyAdmin.servicesReducer.services[id];
export const selectServiceFilters = state => state.companyAdmin.servicesReducer.serviceFilters;
