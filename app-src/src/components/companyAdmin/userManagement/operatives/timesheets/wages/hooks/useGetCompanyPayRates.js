import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPayRates from 'actions/companyAdmin/payRates/fetchPayRates';

import { selectPayRates } from 'selectors/companyAdmin/payRates';
import { isEmpty } from '../../../../../../../helpers/generic';

const useGetCompanyPayRates = () => {
    const dispatch = useDispatch();

    const companyPayRates = useSelector(selectPayRates);

    useEffect(() => {
        dispatch(fetchPayRates());
    }, []);

    const companyPayRateOptions = useMemo(() => {
        if (isEmpty(companyPayRates)) return [];

        const options = companyPayRates?.map(payRate => ({
            value: payRate.id,
            label: payRate.name,
        }));

        return [...options, { value: 0, label: 'Create New', onClick: () => console.log('hello') }];
    }, [companyPayRates]);

    return { companyPayRateOptions };
};

export default useGetCompanyPayRates;
