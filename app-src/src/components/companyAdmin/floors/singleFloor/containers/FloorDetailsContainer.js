import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorStats from '../presentational/FloorStats';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteFloor from 'actions/companyAdmin/floors/async/deleteFloor';
import { CONFIRM_DELETE, ERROR_MODAL } from 'constants/shared/modalTypes';

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
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        console.log(prevProps, 'BEFORE');
        console.log(this.props, 'NOW');
        const {
            deleteSuccess,
            postFailure,
            history,
            showModal,
            hideModal,
            floor
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            console.log('hmmm');
            hideModal();
            history.push(`/company/buildings/${floor.buildingID}`);
        }
        if (postFailure && !prevProps.postFailure) showModal(ERROR_MODAL);
    };

    handleDeleteModal = () => {
        const { id, showModal, hideModal, deleteFloor } = this.props;
        const handleDelete = () => deleteFloor(id);
        const message = 'Are you sure you want to delete this floor?';
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
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
                deleteSuccess
            },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    floor: floors[match.params.id] || {},
    isFetching: fetchingFloors || fetchingStats,
    error: error,
    stats: stats,
    postError,
    deleteSuccess,
    id: match.params.id
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteFloor: id => dispatch(deleteFloor(id))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FloorDetailsContainer)
);
