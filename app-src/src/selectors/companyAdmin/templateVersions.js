export const selectTemplateVersions = state => state.companyAdmin.templateVersionsReducer.versions;
export const selectTemplateVersion = (state, id) =>
    state.companyAdmin.templateVersionsReducer.versions[id];
