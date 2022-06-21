import React from 'react';

import { useForm } from '../../../../../../../helpers/hooks';

import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import PayRateItemForm from './PayRateItemForm';
import usePayRateForm from '../hooks/usePayRateForm';

const PayRateItem = ({ payRate, expandedID, setExpandedID }) => {
    const { id } = payRate;

    const isExpanded = id === expandedID;

    const { nameForm, handleNameChange, itemsForm, handleItemsChange, handleAddNewItem } =
        usePayRateForm(payRate);

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
                        name="name"
                        handleChange={handleNameChange}
                        value={nameForm.name}
                    />
                ) : (
                    <p className="pay-rate-item__name">{nameForm.name}</p>
                )}

                <i className="fa fa-chevron-right" />
            </div>

            <PayRateItemForm
                isExpanded={isExpanded}
                items={Object.values(itemsForm)}
                handleChange={handleItemsChange}
                handleAddNewItem={handleAddNewItem}
            />
        </>
    );
};

export default PayRateItem;
