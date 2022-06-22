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
    handleDeleteItem,
}) => {
    const { id, guid, name, items } = payRate;

    const idToUse = guid || id;
    const isExpanded = idToUse === expandedID;

    const handleExpandRate = () => {
        // if (isExpanded) {
        //     setExpandedID(null);
        // } else {
        setExpandedID(idToUse);
        // }
    };

    return (
        <>
            <div
                className={`pay-rate-item flex-row justify-between align-center ${
                    isExpanded ? 'expanded' : ''
                }`}
                onClick={handleExpandRate}
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
                items={items ? Object.values(items) : []}
                handleChange={handleItemsChange}
                handleAddNewItem={handleAddNewItem}
                handleDeleteItem={handleDeleteItem}
                companyPayRateID={idToUse}
            />
        </>
    );
};

export default PayRateItem;
