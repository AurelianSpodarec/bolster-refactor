import React from 'react';

import { connect } from 'react-redux';

import AddNewFeatureForm from '../presentational/AddNewFeatureForm';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import addNewFeature from 'actions/superAdmin/newFeatures/async/addNewFeature';
import { useForm } from 'helpers/hooks';

function AddNewFeatureFormContainer({ addNewFeature }) {
    const [formData, handleChange] = useForm({
        title: '',
        shortDescription: '',
        fullDescription: '',
        publishDate: '',
        createdOn: '',
    });

    const handleSubmit = e => {
        e.preventDefault();
        addNewFeature(formData);
    };

    return (
        <AddNewFeatureForm
            handleChange={handleChange}
            form={formData}
            handleSubmit={handleSubmit}
        />
    );
}

const mapStateToProps = ({
    superAdmin: {
        newFeaturesReducer: { postSuccess, addedNewFeature },
    },
}) => ({
    postSuccess,
    addedNewFeature,
});

const mapDispatchToProps = {
    showModal,
    addNewFeature,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFeatureFormContainer);
