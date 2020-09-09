import React from 'react';

import { connect } from 'react-redux';

import AddNewFeatureForm from '../presentational/AddNewFeatureForm';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { useForm } from 'helpers/hooks';

function AddNewFeatureFormContainer() {
    const [formData, handleChange] = useForm({
        title: '',
        shortDescription: '',
        fullDescription: '',
        publishDate: '',
    });
    console.log(formData);
    return <AddNewFeatureForm handleChange={handleChange} form={formData} />;
}

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(AddNewFeatureFormContainer);
