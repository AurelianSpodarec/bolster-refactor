export const selectPinsIsFetching = state => state.companyAdmin.pinsReducer.isFetching;
export const selectPinsFetchError = state => state.companyAdmin.pinsReducer.error;
export const selectPins = state => state.companyAdmin.pinsReducer.pins;
export const selectPin = (state, id) => state.companyAdmin.pinsReducer.pins[id];
