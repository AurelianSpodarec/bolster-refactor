import React from 'react';
import { connect } from 'react-redux';

import NewFeaturesTable from '../presentational/NewFeaturesTable';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ADD_NEW_FEATURE } from 'constants/shared/modalTypes';
import { CONFIRM_DELETE, ERROR_MODAL, EDIT_NEW_FEATURE } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import deleteFeature from 'actions/superAdmin/newFeatures/async/deleteFeature';

const NewFeaturesTableContainer = ({
    isFetching,
    error,
    newFeatures,
    showModal,
    deleteFeature,
    hideModal,
}) => {
    return (
        <NewFeaturesTable
            headers={['Title', 'Short Description', 'Publish Date', ' ']}
            isFetching={isFetching}
            error={error}
            newFeatures={newFeatures}
            showNewFeaturesModal={showNewFeaturesModal}
            showDeleteModal={showDeleteModal}
            showEditModal={showEditModal}
        />
    );

    function showNewFeaturesModal() {
        showModal(ADD_NEW_FEATURE);
    }

    function showDeleteModal(id) {
        showModal(CONFIRM_DELETE, { handleDelete: () => handleDelete(id) });
    }

    function showEditModal(feature) {
        showModal(EDIT_NEW_FEATURE, { feature });
    }

    async function handleDelete(id) {
        const { success } = await deleteFeature(id);
        if (success) {
            hideModal();
        } else {
            showModal(ERROR_MODAL);
        }
    }
};

const mapStateToProps = ({
    superAdmin: {
        newFeaturesReducer: { isFetching, error, newFeatures },
    },
}) => ({
    isFetching,
    error,
    newFeatures: Object.values(newFeatures),
});

const mapDispatchToProps = {
    showModal,
    deleteFeature,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFeaturesTableContainer);
