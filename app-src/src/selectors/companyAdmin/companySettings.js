export const selectCompanySettingsIsFetching = state =>
    state.companyAdmin.companySettingsReducer.isFetching;
export const selectCompanySettingsFetchError = state =>
    state.companyAdmin.companySettingsReducer.error;
export const selectCompanySettings = state =>
    state.companyAdmin.companySettingsReducer.companySettings;
export const selectCompanyTimeZone = state =>
    state.companyAdmin.companySettingsReducer.companySettings.timeZone.id || 'Europe/London';
export const selectCompanyDateFormat = state =>
    state.companyAdmin.companySettingsReducer.companySettings.dateFormat;
export const selectCompanyColourCode = state =>
    state.companyAdmin.companySettingsReducer.companySettings.colourCode;
export const selectIsBolsterLogoDark = state =>
    state.companyAdmin.companySettingsReducer.companySettings.isBolsterLogoDark;
export const selectCompanyCurrency = state =>
    state.companyAdmin.companySettingsReducer.companySettings.reportingCurrency;

// todo this may move to subscription
export const selectIsCostingEnabled = state =>
    state.companyAdmin.companySettingsReducer.companySettings.isCostingEnabled;
