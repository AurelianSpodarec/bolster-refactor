export const selectProfile = state => state.shared.profileReducer.profile;
export const selectProfileIsFetching = state => state.shared.profileReducer.isFetching;
export const selectProfileError = state => state.shared.profileReducer.error;
export const selectProfileIsPosting = state => state.shared.profileReducer.isPosting;
export const selectProfilePostSuccess = state => state.shared.profileReducer.postSuccess;
