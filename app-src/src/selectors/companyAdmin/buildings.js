export const selectBuildingsIsFetching = state => state.companyAdmin.buildingsReducer.isFetching;
export const selectBuildingsFetchError = state => state.companyAdmin.buildingsReducer.error;
export const selectBuildings = state => state.companyAdmin.buildingsReducer.buildings;
