import React from 'react';
import { connect } from 'react-redux';

import NewFeaturesTable from '../presentational/NewFeaturesTable';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ADD_NEW_FEATURE } from 'constants/shared/modalTypes';

function NewFeaturesTableContainer({ isFetching, error, newFeatures, showModal }) {
    return (
        <NewFeaturesTable
            headers={['Title', 'Short Description', 'Publish Date']}
            isFetching={isFetching}
            error={error}
            newFeatures={newFeatures}
            showNewFeaturesModal={showNewFeaturesModal}
        />
    );

    function showNewFeaturesModal() {
        showModal(ADD_NEW_FEATURE);
    }
}

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
};
export default connect(mapStateToProps, mapDispatchToProps)(NewFeaturesTableContainer);
