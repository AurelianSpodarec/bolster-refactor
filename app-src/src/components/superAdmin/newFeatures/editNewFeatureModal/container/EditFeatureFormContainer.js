import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { useForm } from 'helpers/hooks';
import { usePrevious } from 'helpers/hooks';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import FeatureForm from '../../presentational/FeatureForm';
import editFeature from 'actions/superAdmin/newFeatures/async/editFeature';

const EditFeatureFormContainer = ({
    feature,
    hideModal,
    showModal,
    isPosting,
    postSuccess,
    error,
    id,
    editFeature,
}) => {
    const [formData, handleChange] = useForm({
        title: feature.title,
        shortDescription: feature.shortDescription,
        fullDescription: feature.fullDescription,
        publishDate: new Date(moment.utc(feature.publishDate)),
    });

    const prevProps = usePrevious({ isPosting });

    const handleSubmit = e => {
        e.preventDefault();
        editFeature({ ...formData, publishDate: moment.utc(formData.publishDate).format() }, id);
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
};

const mapStateToProps = ({
    superAdmin: {
        newFeaturesReducer: { postSuccess, editFeature, isPosting, error },
    },
}) => ({
    postSuccess,
    editFeature,
    isPosting,
    error,
});

const mapDispatchToProps = {
    showModal,
    editFeature,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFeatureFormContainer);
