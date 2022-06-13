import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import { sortArrayByField } from 'helpers/generic';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotPaidInvoicesArr } from 'selectors/companyAdmin/invoices';

const useAccountDeactivated = () => {
    const dispatch = useDispatch();

    const notPaidInvoices = useSelector(selectNotPaidInvoicesArr);
    const invoices = sortArrayByField(notPaidInvoices, 'createdOn');

    useEffect(() => {
        dispatch(fetchAllInvoices());
    }, [dispatch]);

    return { invoices };
};

export default useAccountDeactivated;
