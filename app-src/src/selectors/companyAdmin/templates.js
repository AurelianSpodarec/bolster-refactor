export const selectTemplatesIsFetching = state => state.companyAdmin.templatesReducer.isFetching;
export const selectTemplatesFetchError = state => state.companyAdmin.templatesReducer.error;
export const selectTemplates = state => state.companyAdmin.templatesReducer.templates;
export const selectTemplate = (state, id) => state.companyAdmin.templatesReducer.templates[id];
