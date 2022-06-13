export const selectNotPaidInvoicesArr = state =>
    Object.values(state.companyAdmin.invoicesReducer.invoices).filter(({ isPaid }) => !isPaid);
