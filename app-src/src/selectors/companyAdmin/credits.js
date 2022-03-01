export const selectCredits = state => state.companyAdmin.creditsReducer.credits;
export const selectTotalCredits = state => {
    const credits = selectCredits(state);
    return Object.values(credits).reduce((a, b) => a + b.quantity, 0);
};
export const selectCreditsIsFetching = state => state.companyAdmin.creditsReducer.isFetching;
export const selectCreditsIsPosting = state => state.companyAdmin.creditsReducer.isPosting;
export const selectCreditsPostSuccess = state => state.companyAdmin.creditsReducer.postSuccess;
export const selectCreditsPostError = state => state.companyAdmin.creditsReducer.postError;
export const selectCreditsError = state => state.companyAdmin.creditsReducer.error;
export const selectCostOfCredits = state => state.companyAdmin.creditsReducer.costOfCredits;
export const selectVatCostOfCredits = state => state.companyAdmin.creditsReducer.vatCostOfCredits;
