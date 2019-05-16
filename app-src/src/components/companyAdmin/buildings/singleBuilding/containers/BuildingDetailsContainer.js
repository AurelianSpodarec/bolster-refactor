import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BuildingStats from '../presentational/BuildingStats';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import {
    CONFIRM_DELETE,
    SUCCESS_MODAL,
    ERROR_MODAL,
    CONFIRM_ARCHIVE,
    EDIT_BUILDING
} from 'constants/shared/modalTypes';
import deleteBuilding from 'actions/companyAdmin/buildings/async/deleteBuilding';
import archiveBuilding from 'actions/companyAdmin/buildings/async/archiveBuilding';

class BuildingDetailsContainer extends Component {
    render() {
        const { building, stats, isFetching, error } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!building.id || !stats.statuses}
            >
                <BuildingStats
                    building={building}
                    stats={stats}
                    handleDelete={this.handleDeleteModal}
                    handleArchive={this.handleArchiveModal}
                    handleEditBuildingModal={this.handleEditBuildingModal}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const {
            error,
            postSuccess,
            deleteSuccess,
            postFailure,
            updatedBuildingID,
            history,
            showModal,
            hideModal,
            building
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push(`/company/sites/${building.siteID}`);
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Building edited successfully.',
                link: `/company/buildings/${updatedBuildingID}`,
                linkMessage: 'Go to building'
            });
        }

        if (postFailure && !prevProps.postFailure) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    'There was an error processing your request, please try again later.'
            });
        }
    };

    handleEditBuildingModal = () => {
        const { showModal, building } = this.props;
        showModal(EDIT_BUILDING, { building });
    };

    handleDeleteModal = () => {
        const {
            id,
            showModal,
            hideModal,
            deleteBuilding,
            building
        } = this.props;
        const handleDelete = () => deleteBuilding(id);
        const message = `Are you sure you want to delete ${building.name}`;
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };

    handleArchiveModal = () => {
        const {
            id,
            showModal,
            hideModal,
            building,
            archiveBuilding
        } = this.props;
        const handleArchive = () => {
            archiveBuilding(id, building.isArchived);
            hideModal();
        };
        const message = `Are you sure you want to ${
            building.isArchived ? 'un-' : ''
        }archive ${building.name}?`;
        showModal(CONFIRM_ARCHIVE, { hideModal, handleArchive, message });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: {
                updatedBuildingID,
                postSuccess,
                deleteSuccess,
                buildings,
                error,
                isFetching: fetchingBuildings,
                postFailure
            },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    updatedBuildingID,
    building: buildings[match.params.id] || {},
    isFetching: fetchingBuildings || fetchingStats,
    error,
    stats,
    postSuccess,
    id: match.params.id,
    deleteSuccess,
    postFailure
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteBuilding: id => dispatch(deleteBuilding(id)),
    archiveBuilding: (id, undo) => dispatch(archiveBuilding(id, undo))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingDetailsContainer)
);
