import { useForm } from 'helpers/hooks';
import React from 'react';

import EditTextSettingsForm from '../presentational/EditTextSettingsForm';

const EditTextSettingsFormContainer = () => {
    const [formData, handleChange] = useForm({ loginText: '', registerText: '' });
    return <EditTextSettingsForm {...formData} handleChange={handleChange} />;
};

export default EditTextSettingsFormContainer;
