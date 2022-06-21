import React from 'react';

import { useForm } from '../../../../../../../helpers/hooks';

import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import PayRateItemForm from './PayRateItemForm';

const PayRateItem = ({ payRate: { id, name, items }, expandedID, setExpandedID }) => {
    const isExpanded = id === expandedID;

    const [form, handleChange] = useForm({ name: name });

    return (
        <>
            <div
                className={`pay-rate-item flex-row justify-between align-center ${
                    isExpanded ? 'expanded' : ''
                }`}
                onClick={() => setExpandedID(id)}
            >
                {isExpanded ? (
                    <TextInputContainer name="name" handleChange={handleChange} value={form.name} />
                ) : (
                    <p className="pay-rate-item__name">{name}</p>
                )}

                <i className="fa fa-chevron-right" />
            </div>

            <PayRateItemForm isExpanded={isExpanded} items={items} />
        </>
    );
};

export default PayRateItem;
