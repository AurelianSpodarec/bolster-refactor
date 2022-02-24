import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SiteStats from '../presentational/SiteStats';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    CONFIRM_DELETE,
    SUCCESS_MODAL,
    ERROR_MODAL,
    CONFIRM_ARCHIVE,
    EDIT_SITE,
    DRAWING_EXPIRY_MODAL,
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteSite from 'actions/companyAdmin/sites/async/deleteSite';
import archiveSite from 'actions/companyAdmin/sites/async/archiveSite';
import { isEmpty } from 'helpers/generic';
import filterPinStatsForLevel from 'actions/companyAdmin/stats/async/filterPinStatsForLevel';
import { ACCESS_TYPES_VALUES, HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class SiteDetailsContainer extends Component {
    state = {
        serviceID: null,
        companyID: null,
    };
    render() {
        const {
            site,
            error,
            isFetching,
            stats,
            onMobile,
            serviceIDs,
            services,
            filteredStats,
            filteredStatsBool,
            currentCompanyID,
        } = this.props;
        const { serviceID, companyID } = this.state;
        const filteredServices = services.filter(service => serviceIDs.includes(service.id));

        const servicesForDropdown = filteredServices.map(service => ({
            value: service.id,
            text: service.name,
        }));

        const requestFilteredStats = !isEmpty(filteredStats) ? filteredStats : stats;
        const companiesArr = Object.keys(stats?.statusesByCompany ?? []);
        const companiesForDropdown = companiesArr
            .map(companyKey => {
                const isInvited = site.accessType !== ACCESS_TYPES_VALUES.OWNER;
                const [name, companyID] = companyKey.split('#');
                if (isInvited && currentCompanyID !== +companyID) {
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
                isEmpty={!site.id || !stats.statuses}
            >
                <SiteStats
                    site={site}
                    stats={requestFilteredStats}
                    handleDelete={this.handleDeleteModal}
                    handleArchive={this.handleArchiveModal}
                    handleEditSiteModal={this.handleEditSiteModal}
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
        const { error, deleteSuccess, postSuccess, postFailure, history, showModal, hideModal } =
            this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push('/company/sites');
        }

        if (postSuccess && !prevProps.postSuccess && !deleteSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Site updated successfully.',
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

    handleEditSiteModal = () => {
        const { showModal, site } = this.props;
        showModal(EDIT_SITE, { site });
    };

    handleDeleteModal = () => {
        const { id, showModal, hideModal, site, deleteSite } = this.props;
        const handleDelete = () => deleteSite(id);
        const message = `Are you sure you want to delete ${site.name}?`;
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };

    handleArchiveModal = () => {
        const { id, showModal, hideModal, site, archiveSite } = this.props;
        const handleArchive = () => {
            archiveSite(id, site.isArchived);
            hideModal();
        };
        const message = `Are you sure you want to ${site.isArchived ? 'un-' : ''}archive ${
            site.name
        }?`;
        showModal(CONFIRM_ARCHIVE, {
            hideModal,
            handleArchive,
            message,
            archive: !site.isArchived,
        });
    };

    handleViewDrawingExpiryModal = () => {
        const { id, showModal, hideModal } = this.props;

        showModal(DRAWING_EXPIRY_MODAL, {
            hideModal,
            id,
            hierarchyID: HIERARCHY_IDS.SITE,
        });
    };

    handleChange = (name, value) => this.setState({ [name]: value });
    handleChange = (name, value) => {
        // const otherState = name === 'serviceID' ? 'companyID' : 'serviceID';
        this.setState({ [name]: value });
        const { serviceID, companyID } = this.state;
        const { filterPinStats, site } = this.props;

        const companyIDOption =
            name === 'companyID'
                ? value.split('#')[1]
                : companyID
                ? companyID.split('#')[1]
                : companyID;
        const serviceIDOption = name === 'serviceID' ? value : serviceID;

        filterPinStats(site.id, HIERARCHY_IDS.SITE, companyIDOption, serviceIDOption);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            // companiesReducer: { companies },
            sitesReducer: { sites, postSuccess, isFetching, error, deleteSuccess, postFailure },
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
            decodeJWTReducer: {
                jwtData: { companyID },
            },
        },
    },
    { match },
) => ({
    // companies: Object.values(companies),
    postSuccess,
    site: sites[match.params.id] || {},
    isFetching: isFetching || fetchingStats || isPostingFilters,
    error,
    stats,
    id: match.params.id,
    deleteSuccess,
    onMobile,
    postFailure,
    serviceIDs,
    services: Object.values(services),
    filteredStats,
    filteredStatsBool,
    currentCompanyID: companyID,
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteSite: id => dispatch(deleteSite(id)),
    archiveSite: (id, undo) => dispatch(archiveSite(id, undo)),
    filterPinStats: (id, type, companyID, serviceID) =>
        dispatch(filterPinStatsForLevel(id, type, companyID, serviceID)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteDetailsContainer));
