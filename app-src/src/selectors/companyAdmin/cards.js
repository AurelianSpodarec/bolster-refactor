export const selectCards = state => Object.values(state.companyAdmin.cardsReducer.cards);
export const selectCardsIsFetching = state => state.companyAdmin.cardsReducer.isFetching;
export const selectCardsPostSuccess = state => state.companyAdmin.cardsReducer.postSuccess;
export const selectCardsPostError = state => state.companyAdmin.cardsReducer.postError;
