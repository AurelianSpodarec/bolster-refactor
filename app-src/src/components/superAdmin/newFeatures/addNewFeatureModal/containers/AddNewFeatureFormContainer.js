import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import moment from 'moment';

import { useForm } from 'helpers/hooks';
import { usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import FeatureForm from '../../presentational/FeatureForm';
import addNewFeature from 'actions/superAdmin/newFeatures/async/addNewFeature';

function AddNewFeatureFormContainer({ addNewFeature, isPosting, postSuccess, error, hideModal }) {
    const [formData, handleChange] = useForm({
        title: '',
        shortDescription: '',
        fullDescription: '',
        publishDate: '',
    });

    const prevProps = usePrevious({ isPosting });

    const handleSubmit = e => {
        e.preventDefault();
        addNewFeature({ ...formData, publishDate: moment(formData.publishDate).format() });
    };

    useEffect(() => {
        if (prevProps.isPosting && !isPosting && postSuccess) {
            hideModal();
        }
        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, { message: error });
        }
    }, [isPosting, postSuccess, prevProps.isPosting, error]);

    return <FeatureForm handleChange={handleChange} form={formData} handleSubmit={handleSubmit} />;
}

const mapStateToProps = ({
    superAdmin: {
        newFeaturesReducer: { postSuccess, addedNewFeature, isPosting, error },
    },
}) => ({
    postSuccess,
    addedNewFeature,
    isPosting,
    error,
});

const mapDispatchToProps = {
    showModal,
    addNewFeature,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFeatureFormContainer);
