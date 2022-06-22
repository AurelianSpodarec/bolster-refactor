import React, { useState } from 'react';

import useGetCompanyPayRates from '../hooks/useGetCompanyPayRates';
import usePayRatesForm from '../hooks/usePayRatesForm';

import ModalOuter from '../../../../../../shared/generic/modals/presentational/ModalOuter';
import ModalHeading from '../../../../../../shared/generic/modals/presentational/ModalHeading';
import BlockContainer from '../../../../../../shared/generic/block/containers/BlockContainer';
import PayRateItem from './PayRateItem';
import ActionButton from '../../../../../../shared/generic/button/presentational/ActionButton';

const PayRatesModal = () => {
    const { companyPayRates, isFetching, error } = useGetCompanyPayRates();

    const [expandedID, setExpandedID] = useState(null);
    const {
        form,
        handleAddNewPayRate,
        handleChangePayRateName,
        handleItemsChange,
        handleAddNewItem,
    } = usePayRatesForm();

    console.log(expandedID);
    return (
        <ModalOuter extraClasses="wide">
            <ModalHeading title="Pay Rates" hideCloseButton />
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={!companyPayRates.length}
                contentClass="no-padding"
            >
                {Object.values(form).map(payRate => (
                    <PayRateItem
                        key={payRate.id}
                        payRate={payRate}
                        expandedID={expandedID}
                        setExpandedID={setExpandedID}
                        handleChangePayRateName={handleChangePayRateName}
                        handleItemsChange={handleItemsChange}
                        handleAddNewItem={handleAddNewItem}
                    />
                ))}

                <div className="margin-top">
                    <ActionButton
                        text="Create New"
                        icon="plus"
                        onClick={() => handleAddNewPayRate()}
                    />
                </div>
            </BlockContainer>
        </ModalOuter>
    );
};

export default PayRatesModal;
