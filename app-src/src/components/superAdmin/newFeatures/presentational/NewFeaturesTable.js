import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import NewFeaturesList from './NewFeaturesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE, ERROR_MODAL } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { connect } from 'react-redux';
import deleteFeature from 'actions/superAdmin/newFeatures/async/deleteFeature';

const NewFeaturesTable = ({
    newFeatures,
    headers,
    error,
    isFetching,
    showNewFeaturesModal,
    showModal,
    deleteFeature,
    hideModal,
}) => {
    return (
        <>
            <BlockContainer>
                <BlockHeading title="Recent Updates">
                    <button className="button green" onClick={showNewFeaturesModal}>
                        <i className="fa fa-plus" /> Add New Feature
                    </button>
                </BlockHeading>
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={!newFeatures.length}
                    noDataMessage="No New Features to display"
                >
                    <NewFeaturesList newFeatures={newFeatures} showDeleteModal={showDeleteModal} />
                </Table>
            </BlockContainer>
        </>
    );

    function showDeleteModal(id) {
        showModal(CONFIRM_DELETE, { handleDelete: () => handleDelete(id) });
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

const mapDispatchToProps = {
    showModal,
    deleteFeature,
    hideModal,
};
export default connect(null, mapDispatchToProps)(NewFeaturesTable);
