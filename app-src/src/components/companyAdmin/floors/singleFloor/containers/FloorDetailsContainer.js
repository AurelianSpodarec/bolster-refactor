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
    EDIT_FLOOR,
    DRAWING_EXPIRY_MODAL,
} from 'constants/shared/modalTypes';
import archiveFloor from 'actions/companyAdmin/floors/async/archiveFloor';
import { isEmpty } from 'helpers/generic';
import filterPinStatsForLevel from 'actions/companyAdmin/stats/async/filterPinStatsForLevel';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class FloorDetailsContainer extends Component {
    state = {
        serviceID: null,
        companyID: null,
    };
    render() {
        const {
            floor,
            stats,
            error,
            isFetching,
            onMobile,
            services,
            serviceIDs,
            filteredStats,
            filteredStatsBool,
            isOwner,
            loggedInCompanyID,
        } = this.props;

        const { serviceID, companyID } = this.state;
        const filteredServices = services.filter(service => serviceIDs.includes(service.id));

        const servicesForDropdown = filteredServices.map(service => ({
            value: service.id,
            text: service.name,
        }));

        const requestFilteredStats = !isEmpty(filteredStats) ? filteredStats : stats;
        const companyStatsArr = Object.keys(stats?.statusesByCompany ?? []);
        const companiesForDropdown = companyStatsArr
            .map(companyKey => {
                const [name, id] = companyKey.split('#');
                if (!isOwner && +id !== +loggedInCompanyID) {
                    return null;
                }
                return {
                    value: companyKey,
                    text: name,
                };
            })
            .filter(Boolean);

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!floor.id || !stats.statuses}
            >
                <FloorStats
                    floor={floor}
                    stats={requestFilteredStats}
                    handleDelete={this.handleDeleteModal}
                    handleArchive={this.handleArchiveModal}
                    handleEditFloorModal={this.handleEditFloorModal}
                    onMobile={onMobile}
                    handleChange={this.handleChange}
                    serviceOptions={servicesForDropdown}
                    serviceID={serviceID}
                    handleViewDrawingExpiryModal={this.handleViewDrawingExpiryModal}
                    companyID={companyID}
                    companyOptions={companiesForDropdown}
                    filteredStatsBool={filteredStatsBool}
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
            floor,
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push(`/company/buildings/${floor.buildingID}`);
        }

        if (postSuccess && !prevProps.postSuccess && !deleteSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Floor edited successfully.',
            });
        }

        if (postFailure && !prevProps.postFailure) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    '##There was an error processing your request, please try again later.##',
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
        const message = `Are you sure you want to ${floor.isArchived ? 'un-' : ''}archive ${
            floor.name
        }?`;
        showModal(CONFIRM_ARCHIVE, {
            hideModal,
            handleArchive,
            message,
            archive: !floor.isArchived,
        });
    };

    handleViewDrawingExpiryModal = () => {
        const { id, showModal, hideModal } = this.props;

        showModal(DRAWING_EXPIRY_MODAL, {
            hideModal,
            id,
            hierarchyID: HIERARCHY_IDS.FLOOR,
        });
    };

    handleChange = (name, value) => this.setState({ [name]: value });
    handleChange = (name, value) => {
        this.setState({ [name]: value });

        const { serviceID, companyID } = this.state;
        const { filterPinStats, floor } = this.props;

        const companyIDOption =
            name === 'companyID'
                ? value.split('#')[1]
                : companyID
                ? companyID.split('#')[1]
                : companyID;
        const serviceIDOption = name === 'serviceID' ? value : serviceID;

        filterPinStats(floor.id, HIERARCHY_IDS.FLOOR, companyIDOption, serviceIDOption);
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
                postSuccess,
            },
            statsReducer: {
                stats,
                isFetching: fetchingStats,
                filteredStats,
                filteredStatsBool,
                isPostingFilters,
            },
            subscriptionsReducer: {
                subscriptions: { serviceIDs },
            },
            servicesReducer: { services },
        },
        shared: {
            decodeJWTReducer: { jwtData },
            mobileReducer: { onMobile },
        },
    },
    { match },
) => {
    const { companyID } = jwtData;
    const floor = floors[match.params.id] ?? {};
    const isOwner = +companyID === +floor.ownerCompanyID;
    return {
        floor,
        isFetching: fetchingFloors || fetchingStats || isPostingFilters,
        error,
        stats,
        postError,
        deleteSuccess,
        postSuccess,
        onMobile,
        id: match.params.id,
        serviceIDs,
        services: Object.values(services),
        filteredStats,
        filteredStatsBool,
        loggedInCompanyID: companyID,
        isOwner,
    };
};

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteFloor: id => dispatch(deleteFloor(id)),
    archiveFloor: (id, undo) => dispatch(archiveFloor(id, undo)),
    filterPinStats: (id, type, companyID, serviceID) =>
        dispatch(filterPinStatsForLevel(id, type, companyID, serviceID)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FloorDetailsContainer));
