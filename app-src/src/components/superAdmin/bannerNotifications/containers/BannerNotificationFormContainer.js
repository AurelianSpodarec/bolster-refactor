import { useForm } from 'helpers/hooks';
import React from 'react';

import BannerNotificationForm from '../presentational/BannerNotificationForm';

const BannerNotificationFormContainer = () => {
    const [formData, handleChange] = useForm({
        name: '',
        startDate: '',
        endDate: '',
        content: '',
        colour: '',
    });
    return (
        <BannerNotificationForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );

    function handleSubmit() {
        console.log({ formData });
    }
};

export default BannerNotificationFormContainer;
