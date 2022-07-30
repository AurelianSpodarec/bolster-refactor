export const selectServicesArr = state =>
    Object.values(state.superAdmin.adminServicesReducer.adminServices || {});
export const selectServiceIDs = state => selectServicesArr(state).map(({ id }) => id);

export const selectServicesIsFetching = state => state.superAdmin.adminServicesReducer.isFetching;
export const selectServicesFetchError = state => state.superAdmin.adminServicesReducer.error;
export const selectServices = state => state.superAdmin.adminServicesReducer.adminServices;
export const selectService = (state, id) => state.superAdmin.adminServicesReducer.adminServices[id];
