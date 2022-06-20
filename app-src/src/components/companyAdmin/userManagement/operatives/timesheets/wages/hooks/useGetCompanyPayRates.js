import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchPayRates from 'actions/companyAdmin/payRates/fetchPayRates';

import { selectPayRates } from 'selectors/companyAdmin/payRates';

import { isEmpty } from 'helpers/generic';

import { PAY_RATES_MODAL } from 'constants/shared/modalTypes';

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

        return [
            ...options,
            { value: 0, label: 'Create New', onClick: () => dispatch(showModal(PAY_RATES_MODAL)) },
        ];
    }, [companyPayRates]);

    return { companyPayRateOptions };
};

export default useGetCompanyPayRates;
