import { UPDATE_INVOICE_FILTERS } from 'constants/actionTypes/superAdminInvoices';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: UPDATE_INVOICE_FILTERS,
        fieldName,
        searchTerm
    });
