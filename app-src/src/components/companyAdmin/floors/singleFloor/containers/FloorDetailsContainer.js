import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorStats from '../presentational/FloorStats';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteFloor from 'actions/companyAdmin/floors/async/deleteFloor';
import {
    CONFIRM_DELETE,
    ERROR_MODAL,
    SUCCESS_MODAL,
    CONFIRM_ARCHIVE,
    EDIT_FLOOR
} from 'constants/shared/modalTypes';
import archiveFloor from 'actions/companyAdmin/floors/async/archiveFloor';

class FloorDetailsContainer extends Component {
    render() {
        const { floor, stats, error, isFetching } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!floor.id || !stats.statuses}
            >
                <FloorStats
                    floor={floor}
                    stats={stats}
                    handleDelete={this.handleDeleteModal}
                    handleArchive={this.handleArchiveModal}
                    handleEditFloorModal={this.handleEditFloorModal}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const {
            error,
            deleteSuccess,
            postSuccess,
            postFailure,
            history,
            showModal,
            hideModal,
            floor
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push(`/company/buildings/${floor.buildingID}`);
        }

        if (postSuccess && !prevProps.postSuccess && !deleteSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Floor edited successfully.'
            });
        }

        if (postFailure && !prevProps.postFailure) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    '##There was an error processing your request, please try again later.##'
            });
        }
    };

    handleEditFloorModal = () => {
        const { showModal, floor } = this.props;
        showModal(EDIT_FLOOR, { floor });
    };

    handleDeleteModal = () => {
        const { id, showModal, hideModal, deleteFloor } = this.props;
        const handleDelete = () => deleteFloor(id);
        const message = 'Are you sure you want to delete this floor?';
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };

    handleArchiveModal = () => {
        const { id, showModal, hideModal, floor, archiveFloor } = this.props;
        const handleArchive = () => {
            archiveFloor(id, floor.isArchived);
            hideModal();
        };
        const message = `Are you sure you want to ${
            floor.isArchived ? 'un-' : ''
        }archive ${floor.name}?`;
        showModal(CONFIRM_ARCHIVE, {
            hideModal,
            handleArchive,
            message,
            archive: !floor.isArchived
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: {
                floors,
                isFetching: fetchingFloors,
                error,
                postError,
                deleteSuccess,
                postSuccess
            },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    floor: floors[match.params.id] || {},
    isFetching: fetchingFloors || fetchingStats,
    error,
    stats,
    postError,
    deleteSuccess,
    postSuccess,
    id: match.params.id
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteFloor: id => dispatch(deleteFloor(id)),
    archiveFloor: (id, undo) => dispatch(archiveFloor(id, undo))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FloorDetailsContainer)
);
