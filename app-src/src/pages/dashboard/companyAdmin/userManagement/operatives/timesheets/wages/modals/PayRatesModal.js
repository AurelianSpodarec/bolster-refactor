import React, { useState } from 'react';

import useGetCompanyPayRates from '../hooks/useGetCompanyPayRates';
import usePayRatesForm from '../hooks/usePayRatesForm';

import ModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/ModalOuter';
import ModalHeading from 'components_DEPRECATED/shared/generic/modals/presentational/ModalHeading';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PayRateItem from './PayRateItem';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const PayRatesModal = () => {
    const { isFetching, error } = useGetCompanyPayRates();

    const [expandedID, setExpandedID] = useState(null);
    const {
        form,
        handleAddNewPayRate,
        handleChangePayRateName,
        handleDeletePayRate,
        handleItemsChange,
        handleAddNewItem,
        handleDeleteItem,
        handleChange,
        handleSave,
        isPosting,
    } = usePayRatesForm();

    return (
        <ModalOuter extraClasses="wide">
            <ModalHeading title="Pay Rates" hideCloseButton />
            <BlockContainer isFetching={isFetching} error={error} contentClass="no-padding">
                {Object.values(form).map((payRate, _, ratesArr) => {
                    const idToUse = payRate.guid || payRate.id;

                    return (
                        <PayRateItem
                            key={idToUse}
                            payRate={payRate}
                            expandedID={expandedID}
                            setExpandedID={setExpandedID}
                            handleChangePayRateName={handleChangePayRateName}
                            handleDeletePayRate={handleDeletePayRate}
                            handleChange={handleChange}
                            handleAddNewItem={handleAddNewItem}
                            handleDeleteItem={handleDeleteItem}
                            isDeleteDisabled={ratesArr.length === 1}
                            handleItemsChange={handleItemsChange}
                        />
                    );
                })}

                <div className="margin-top">
                    <ActionButton text="Create New" icon="plus" onClick={handleAddNewPayRate} />
                </div>

                <div className="margin-top padding-top border-top flex flex-row justify-end">
                    <ActionButton
                        text="Save"
                        icon="save"
                        ambient="positive"
                        onClick={handleSave}
                        size="large"
                        disabled={isPosting}
                    />
                </div>
            </BlockContainer>
        </ModalOuter>
    );
};

export default PayRatesModal;
