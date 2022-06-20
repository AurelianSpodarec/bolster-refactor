import React, { useState } from 'react';

import useGetCompanyPayRates from '../hooks/useGetCompanyPayRates';

import ModalOuter from '../../../../../../shared/generic/modals/presentational/ModalOuter';
import ModalHeading from '../../../../../../shared/generic/modals/presentational/ModalHeading';
import BlockContainer from '../../../../../../shared/generic/block/containers/BlockContainer';
import PayRateItem from './PayRateItem';

const PayRatesModal = () => {
    const { companyPayRates, isFetching, error } = useGetCompanyPayRates();

    const [expandedID, setExpandedID] = useState(null);
    return (
        <ModalOuter>
            <ModalHeading title="Pay Rates" hideCloseButton />
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={!companyPayRates.length}
                contentClass="no-padding"
            >
                {companyPayRates.map(payRate => (
                    <PayRateItem
                        key={payRate.id}
                        payRate={payRate}
                        expandedID={expandedID}
                        setExpandedID={setExpandedID}
                    />
                ))}
            </BlockContainer>
        </ModalOuter>
    );
};

export default PayRatesModal;
