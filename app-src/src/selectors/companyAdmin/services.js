export const selectServices = state =>
    Object.values(state.companyAdmin.servicesReducer.services || {});
export const selectServiceIDs = state => selectServices(state).map(({ id }) => id);
