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
    CREATE_HIERARCHY_ALERT_MODAL,
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteSite from 'actions/companyAdmin/sites/async/deleteSite';
import archiveSite from 'actions/companyAdmin/sites/async/archiveSite';

class SiteDetailsContainer extends Component {
    state = {
        serviceID: null,
    };
    render() {
        const { site, error, isFetching, stats, onMobile, serviceIDs, services } = this.props;
        const { serviceID } = this.state;
        const filteredServices = services.filter(service => serviceIDs.includes(service.id));
        const servicesForDropdown = filteredServices.map(service => ({
            value: service.id,
            text: service.name,
        }));

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!site.id || !stats.statuses}
            >
                <SiteStats
                    site={site}
                    stats={stats}
                    handleDelete={this.handleDeleteModal}
                    handleArchive={this.handleArchiveModal}
                    handleEditSiteModal={this.handleEditSiteModal}
                    onMobile={onMobile}
                    handleChange={this.handleChange}
                    serviceOptions={servicesForDropdown}
                    serviceID={serviceID}
                    handleCreateHierarchyAlertModal={this.handleCreateHierarchyAlertModal}
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

    handleCreateHierarchyAlertModal = () => {
        const { showModal } = this.props;
        showModal(CREATE_HIERARCHY_ALERT_MODAL, { hierarchy: 'Site' });
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

    handleChange = (name, value) => this.setState({ [name]: value });
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: { sites, postSuccess, isFetching, error, deleteSuccess, postFailure },
            statsReducer: { stats, isFetching: fetchingStats },
            subscriptionsReducer: {
                subscriptions: { serviceIDs },
            },
            servicesReducer: { services },
        },
        shared: {
            mobileReducer: { onMobile },
        },
    },
    { match },
) => ({
    postSuccess,
    site: sites[match.params.id] || {},
    isFetching: isFetching || fetchingStats,
    error,
    stats,
    id: match.params.id,
    deleteSuccess,
    onMobile,
    postFailure,
    serviceIDs,
    services: Object.values(services),
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteSite: id => dispatch(deleteSite(id)),
    archiveSite: (id, undo) => dispatch(archiveSite(id, undo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteDetailsContainer));
