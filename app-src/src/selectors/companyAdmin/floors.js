export const selectFloorsIsFetching = state => state.companyAdmin.floorsReducer.isFetching;
export const selectFloorsFetchError = state => state.companyAdmin.floorsReducer.error;
export const selectFloors = state => state.companyAdmin.floorsReducer.floors;
export const selectFloor = (state, id) => state.companyAdmin.floorsReducer.floors[id];
