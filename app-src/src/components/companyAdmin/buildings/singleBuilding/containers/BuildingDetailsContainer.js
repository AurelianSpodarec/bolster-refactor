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
    EDIT_BUILDING,
    CREATE_HIERARCHY_ALERT_MODAL,
} from 'constants/shared/modalTypes';
import deleteBuilding from 'actions/companyAdmin/buildings/async/deleteBuilding';
import archiveBuilding from 'actions/companyAdmin/buildings/async/archiveBuilding';
import { isEmpty, isObjEmpty } from 'helpers/generic';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import filterPinStatsForLevel from 'actions/companyAdmin/stats/async/filterPinStatsForLevel';

class BuildingDetailsContainer extends Component {
    state = {
        serviceID: null,
        companyID: null,
    };
    render() {
        const {
            building,
            stats,
            isFetching,
            error,
            onMobile,
            serviceIDs,
            services,
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
                isEmpty={!building.id || !stats.statuses}
            >
                <BuildingStats
                    building={building}
                    stats={requestFilteredStats}
                    handleDelete={this.handleDeleteModal}
                    handleArchive={this.handleArchiveModal}
                    handleEditBuildingModal={this.handleEditBuildingModal}
                    onMobile={onMobile}
                    handleChange={this.handleChange}
                    serviceOptions={servicesForDropdown}
                    serviceID={serviceID}
                    companyID={companyID}
                    companyOptions={companiesForDropdown}
                    filteredStatsBool={filteredStatsBool}
                    handleCreateHierarchyAlertModal={this.handleCreateHierarchyAlertModal}
                    handleViewHierarchyAlerts={this.handleViewHierarchyAlerts}
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
            building,
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push(`/company/sites/${building.siteID}`);
        }

        if (postSuccess && !prevProps.postSuccess && !deleteSuccess && updatedBuildingID !== 0) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Building edited successfully.',
                link: `/company/buildings/${updatedBuildingID}`,
                linkMessage: 'Go to building',
            });
        }

        if (
            building.isArchived !== prevProps.building.isArchived &&
            !isObjEmpty(prevProps.building)
        ) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: `Building successfully ${!building.isArchived ? 'un' : ''}archived.`,
            });
        }

        if (postFailure && !prevProps.postFailure) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    'There was an error processing your request, please try again later.',
            });
        }
    };

    handleCreateHierarchyAlertModal = () => {
        const { showModal, building } = this.props;
        showModal(CREATE_HIERARCHY_ALERT_MODAL, {
            hierarchyType: HIERARCHY_IDS.BUILDING,
            hierarchyID: building.id,
        });
    };

    handleEditBuildingModal = () => {
        const { showModal, building } = this.props;
        showModal(EDIT_BUILDING, { building });
    };

    handleDeleteModal = () => {
        const { id, showModal, hideModal, deleteBuilding, building } = this.props;
        const handleDelete = () => deleteBuilding(id);
        const message = `Are you sure you want to delete ${building.name}`;
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };

    handleArchiveModal = () => {
        const { id, showModal, hideModal, building, archiveBuilding } = this.props;
        const handleArchive = () => {
            archiveBuilding(id, building.isArchived);
            hideModal();
        };
        const message = `Are you sure you want to ${building.isArchived ? 'un-' : ''}archive ${
            building.name
        }?`;
        showModal(CONFIRM_ARCHIVE, {
            hideModal,
            handleArchive,
            message,
            archive: !building.isArchived,
        });
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
        const { serviceID, companyID } = this.state;
        const { filterPinStatsForLevel, building } = this.props;

        const companyIDOption =
            name === 'companyID'
                ? value.split('#')[1]
                : companyID
                ? companyID.split('#')[1]
                : companyID;
        const serviceIDOption = name === 'serviceID' ? value : serviceID;

        filterPinStatsForLevel(
            building.id,
            HIERARCHY_IDS.BUILDING,
            companyIDOption,
            serviceIDOption,
        );
    };
    handleViewHierarchyAlerts = () => {
        const { building, history } = this.props;

        history.push(`/company/buildings/${building.id}/upcoming-alerts`);
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
                postFailure,
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
            mobileReducer: { onMobile },
            decodeJWTReducer: { jwtData },
        },
    },
    { match },
) => {
    const { companyID } = jwtData;
    const building = buildings[match.params.id] ?? {};
    const isOwner = +companyID === +building.ownerCompanyID;
    return {
        updatedBuildingID,
        building,
        isFetching: fetchingBuildings || fetchingStats || isPostingFilters,
        error,
        stats,
        postSuccess,
        id: match.params.id,
        deleteSuccess,
        onMobile,
        postFailure,
        serviceIDs,
        services: Object.values(services),
        filteredStats,
        filteredStatsBool,
        loggedInCompanyID: companyID,
        isOwner,
    };
};

const mapDispatchToProps = {
    showModal,
    hideModal,
    deleteBuilding,
    archiveBuilding,
    filterPinStatsForLevel,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuildingDetailsContainer));
