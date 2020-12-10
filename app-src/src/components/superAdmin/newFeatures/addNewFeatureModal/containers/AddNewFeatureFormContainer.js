import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import moment from 'moment';

import { useForm } from 'helpers/hooks';
import { usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import FeatureForm from '../../presentational/FeatureForm';
import addNewFeature from 'actions/superAdmin/newFeatures/async/addNewFeature';

function AddNewFeatureFormContainer({
    addNewFeature,
    isPosting,
    postSuccess,
    error,
    hideModal,
    filesUploading,
}) {
    const [formData, handleChange] = useForm({
        title: null,
        fullDescription: null,
        publishDate: null,
        image: null,
        videoLink: null,
    });
    const [showVideoField, setShowVideoField] = useState(false);
    const [showImageField, setShowImageField] = useState(false);

    const prevProps = usePrevious({ isPosting });

    const handleSubmit = e => {
        e.preventDefault();

        if (!filesUploading) {
            addNewFeature({ ...formData, publishDate: moment.utc(formData.publishDate).format() });
        }
    };

    useEffect(() => {
        if (prevProps.isPosting && !isPosting && postSuccess) {
            hideModal();
        }
        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, { message: error });
        }
    }, [isPosting, postSuccess, prevProps.isPosting, error]);

    return (
        <FeatureForm
            handleChange={handleChange}
            form={formData}
            handleSubmit={handleSubmit}
            handleCheckboxChange={handleCheckboxChange}
            showVideoField={showVideoField}
            showImageField={showImageField}
        />
    );

    function handleCheckboxChange(name, value) {
        if (name === 'videoLink') {
            setShowVideoField(value);
        }
        if (name === 'image') {
            setShowImageField(value);
        }
    }
}

const mapStateToProps = ({
    superAdmin: {
        newFeaturesReducer: { postSuccess, addedNewFeature, isPosting, error },
    },
    shared: {
        filesUploadingReducer: { filesUploading },
    },
}) => ({
    postSuccess,
    addedNewFeature,
    isPosting,
    error,
    filesUploading,
});

const mapDispatchToProps = {
    showModal,
    addNewFeature,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFeatureFormContainer);
