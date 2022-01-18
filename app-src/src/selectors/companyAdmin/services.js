export const selectServicesArr = state =>
    Object.values(state.companyAdmin.servicesReducer.services || {});
export const selectServiceIDs = state => selectServicesArr(state).map(({ id }) => id);
