import React from 'react';

import useGetCompanyPayRates from '../hooks/useGetCompanyPayRates';

import ModalOuter from '../../../../../../shared/generic/modals/presentational/ModalOuter';
import ModalHeading from '../../../../../../shared/generic/modals/presentational/ModalHeading';

const PayRatesModal = () => {
    const { companyPayRates, isFetching, error } = useGetCompanyPayRates();

    return (
        <ModalOuter>
            <ModalHeading title="Pay Rates" hideCloseButton />
        </ModalOuter>
    );
};

export default PayRatesModal;
