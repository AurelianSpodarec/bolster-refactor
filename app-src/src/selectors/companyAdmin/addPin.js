export const selectAddPinAnswers = state => state.companyAdmin.addPinFormReducer.answers;
export const selectAddPinMeasurements = state => state.companyAdmin.addPinFormReducer.measurements;
export const selectAddPinQuestionMeasurements = (state, questionID) => {
    return state.companyAdmin.addPinFormReducer.measurements[questionID] ?? {};
};
export const selectAddPinStatus = state => state.companyAdmin.addPinFormReducer.status;
export const selectAddPinServiceID = state => state.companyAdmin.addPinFormReducer.serviceID;
