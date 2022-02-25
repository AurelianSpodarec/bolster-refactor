export const selectTemplateVersion = (state, id) =>
    state.companyAdmin.templateVersionsReducer.versions[id];
