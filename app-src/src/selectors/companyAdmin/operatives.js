export const selectOperative = (state, companyUserID) => {
    const operativePermissions = Object.values(state.companyAdmin.operativesReducer.operatives);
    const companyUserPermission = operativePermissions.find(
        opPermission => opPermission.companyUserID === companyUserID,
    );
    return companyUserPermission;
};

export const getOperatives = state => state.companyAdmin.operativesReducer.operatives;
export const getOperativesIsFetching = state => state.companyAdmin.operativesReducer.isFetching;
