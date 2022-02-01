export const selectFaqsIsFetching = state => state.superAdmin.faqsReducer.isFetching;
export const selectFaqsIsPosting = state => state.superAdmin.faqsReducer.isPosting;
export const selectFaqsPostSuccess = state => state.superAdmin.faqsReducer.postSuccess;
export const selectFaqs = state => state.superAdmin.faqsReducer.faqs;
export const selectFaqsSingle = (state, id) => state.superAdmin.faqsReducer.faqs[id];
