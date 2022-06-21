import React from 'react';

import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import PayRateItemForm from './PayRateItemForm';

const PayRateItem = ({
    payRate,
    expandedID,
    setExpandedID,
    handleChangePayRateName,
    handleItemsChange,
    handleAddNewItem,
}) => {
    const { id, name, items } = payRate;

    const isExpanded = id === expandedID;

    return (
        <>
            <div
                className={`pay-rate-item flex-row justify-between align-center ${
                    isExpanded ? 'expanded' : ''
                }`}
                onClick={() => setExpandedID(id)}
            >
                {isExpanded ? (
                    <TextInputContainer
                        name={id}
                        handleChange={handleChangePayRateName}
                        value={name}
                    />
                ) : (
                    <p className="pay-rate-item__name">{name}</p>
                )}

                <i className="fa fa-chevron-right" />
            </div>

            <PayRateItemForm
                isExpanded={isExpanded}
                items={Object.values(items)}
                handleChange={handleItemsChange}
                handleAddNewItem={handleAddNewItem}
                companyPayRateID={id}
            />
        </>
    );
};

export default PayRateItem;
