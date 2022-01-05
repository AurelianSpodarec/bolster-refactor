export const selectCompanyUsersIsFetching = state =>
    state.companyAdmin.companyUsersReducer.isFetching;
export const selectCompanyUsersFetchError = state => state.companyAdmin.companyUsersReducer.error;
export const selectCompanyUsers = state => state.companyAdmin.companyUsersReducer.users;
export const selectCompanyUser = (state, id) => state.companyAdmin.companyUsersReducer.users[id];
export const selectCompanyUserID = state => state.shared.decodeJWTReducer.jwtData.companyUserID;
