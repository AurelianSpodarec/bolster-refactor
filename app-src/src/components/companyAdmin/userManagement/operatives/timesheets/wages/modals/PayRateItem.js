import React from 'react';

import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import PayRateItemForm from './PayRateItemForm';

const PayRateItem = ({
    payRate,
    expandedID,
    setExpandedID,
    handleChangePayRateName,
    handleDeletePayRate,
    handleItemsChange,
    handleAddNewItem,
    handleDeleteItem,
    isDeleteDisabled,
}) => {
    const { id, guid, name, items } = payRate;

    const idToUse = guid || id;
    const isExpanded = idToUse === expandedID;

    const handleExpandRate = () => {
        if (isExpanded) {
            setExpandedID(null);
        } else {
            setExpandedID(idToUse);
        }
    };

    return (
        <>
            <div className="flex-row align-center">
                <button
                    className={`pay-rate-item flex-12 flex-row justify-between align-center ${
                        isExpanded ? 'expanded' : ''
                    }`}
                    onClick={() => setExpandedID(idToUse)}
                    disabled={isExpanded}
                >
                    <div className="flex-11 flex-12 flex-row justify-start align-center">
                        {isExpanded ? (
                            <TextInputContainer
                                name={idToUse}
                                handleChange={handleChangePayRateName}
                                value={name}
                            />
                        ) : (
                            <p className="pay-rate-item__name">{name}</p>
                        )}
                    </div>

                    <div
                        className="flex-1 flex-row align-center justify-end"
                        onClick={handleExpandRate}
                    >
                        <i className="fa fa-chevron-right" />
                    </div>
                </button>

                <button
                    className="flex-column justify-center align-center delete-icon rate"
                    onClick={() => handleDeletePayRate(idToUse)}
                    disabled={isDeleteDisabled}
                >
                    <i className="far fa-trash-alt" />
                </button>
            </div>

            <PayRateItemForm
                isExpanded={isExpanded}
                items={Object.values(items)}
                handleChange={handleItemsChange}
                handleAddNewItem={handleAddNewItem}
                handleDeleteItem={handleDeleteItem}
                companyPayRateID={idToUse}
            />
        </>
    );
};

export default PayRateItem;
