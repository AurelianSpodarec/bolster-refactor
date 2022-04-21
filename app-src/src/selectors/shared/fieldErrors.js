export const selectFieldErrors = state => state.shared.fieldErrorsReducer.fieldErrors;
export const selectFieldError = (state, name) => state.shared.fieldErrorsReducer.fieldErrors[name];
export const selectFieldErrorsVisible = state => state.shared.fieldErrorsReducer.errorsVisible;
