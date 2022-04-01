export const selectUsersPostSuccess = state => state.superAdmin.usersReducer.postSuccess;
export const selectUsersError = state => state.superAdmin.usersReducer.error;
export const selectUsersIsPosting = state => state.superAdmin.usersReducer.isPosting;
export const selectUsersShouldShowMergeModal = state =>
    state.superAdmin.usersReducer.shouldShowMergeModal;
