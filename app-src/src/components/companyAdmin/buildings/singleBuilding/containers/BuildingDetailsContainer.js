import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BuildingStats from '../presentational/BuildingStats';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE, ERROR_MODAL } from 'constants/shared/modalTypes';
import deleteBuilding from 'actions/companyAdmin/buildings/async/deleteBuilding';

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
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const {
            deleteSuccess,
            postFailure,
            history,
            showModal,
            hideModal,
            building
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push(`/company/sites/${building.siteID}`);
        }
        if (postFailure && !prevProps.postFailure) showModal(ERROR_MODAL);
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
}

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: {
                deleteSuccess,
                buildings,
                error,
                isFetching: fetchingBuildings
            },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    building: buildings[match.params.id] || {},
    isFetching: fetchingBuildings || fetchingStats,
    error,
    stats,
    id: match.params.id,
    deleteSuccess
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteBuilding: id => dispatch(deleteBuilding(id))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingDetailsContainer)
);
