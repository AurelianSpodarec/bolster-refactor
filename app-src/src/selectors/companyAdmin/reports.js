export const selectReportsIsFetching = state => state.companyAdmin.reportsReducer.isFetching;
export const selectReportsError = state => state.companyAdmin.reportsReducer.error;
export const selectReportCustomFilters = state => state.companyAdmin.reportsReducer.customFilters;

export const selectReportCompanies = state =>
    state.companyAdmin.reportsReducer.customFilters.companies;
export const selectReportOperatives = state =>
    state.companyAdmin.reportsReducer.customFilters.operatives;
export const selectReportPins = state => state.companyAdmin.reportsReducer.customFilters.pins;
export const selectReportQuestions = state =>
    state.companyAdmin.reportsReducer.customFilters.questions;
export const selectReportTemplates = state =>
    state.companyAdmin.reportsReducer.customFilters.templates;
export const selectReportServices = state =>
    state.companyAdmin.reportsReducer.customFilters.services;
