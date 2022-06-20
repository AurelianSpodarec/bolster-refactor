import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPayRates from 'actions/companyAdmin/payRates/fetchPayRates';

import { selectPayRates } from 'selectors/companyAdmin/payRates';

const useGetCompanyPayRates = () => {
    const dispatch = useDispatch();

    const companyPayRates = useSelector(selectPayRates);

    useEffect(() => {
        dispatch(fetchPayRates());
    }, []);

    return { companyPayRates };
};

export default useGetCompanyPayRates;
