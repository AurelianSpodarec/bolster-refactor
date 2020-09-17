import React from 'react';
import { useForm } from 'helpers/hooks';

import AutoDeleteSettingsModal from '../presentational/AutoDeleteSettingsModal';

const AutoDeleteSettingsModalContainer = () => {
    const [formData, handleChange] = useForm({ valueToUpdate: '' });

    function handleSubmit() {
        console.log('Inside handle submit');
    }

    return (
        <AutoDeleteSettingsModal
            form={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default AutoDeleteSettingsModalContainer;
