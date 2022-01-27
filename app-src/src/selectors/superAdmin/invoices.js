// all invoices
export const selectSuperAdminInvoices = state => state.superAdmin.invoicesReducer.invoices;
export const selectSuperAdminInvoicesArr = state =>
    Object.values(state.superAdmin.invoicesReducer.invoices);
export const selectSuperAdminInvoicesIsFetching = state =>
    state.superAdmin.invoicesReducer.isFetching;
export const selectSuperAdminInvoicesError = state => state.superAdmin.invoicesReducer.error;

// company invoices
export const selectSuperAdminInvoicesForCompany = (state, id) => {
    const invoicesArr = selectSuperAdminInvoicesArr(state);
    return invoicesArr.filter(invoice => +invoice.companyID === +id);
};

// pagination
export const selectSuperAdminInvoicesPaginationPage = state =>
    state.superAdmin.invoicesReducer.pagination.page;
export const selectSuperAdminInvoicesPaginationPageSize = state =>
    state.superAdmin.invoicesReducer.pagination.pageSize;
export const selectSuperAdminInvoicesPaginationTotalPages = state =>
    state.superAdmin.invoicesReducer.pagination.totalPages;
export const selectSuperAdminInvoicesPaginationTotalCount = state =>
    state.superAdmin.invoicesReducer.pagination.totalCount;
