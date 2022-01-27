export const selectSitesIsFetching = state => state.companyAdmin.sitesReducer.isFetching;
export const selectSitesFetchError = state => state.companyAdmin.sitesReducer.error;
export const selectSites = state => state.companyAdmin.sitesReducer.sites;
export const selectSite = (state, id) => state.companyAdmin.sitesReducer.sites[id];
export const selectSiteFilters = state => state.companyAdmin.sitesReducer.siteFilters;
