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
    EDIT_SITE
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteSite from 'actions/companyAdmin/sites/async/deleteSite';
import archiveSite from 'actions/companyAdmin/sites/async/archiveSite';

class SiteDetailsContainer extends Component {
    render() {
        const { site, error, isFetching, stats, onMobile } = this.props;

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
            hideModal
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push('/company/sites');
        }

        if (postSuccess && !prevProps.postSuccess && !deleteSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Site edited successfully.'
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
        const message = `Are you sure you want to ${
            site.isArchived ? 'un-' : ''
        }archive ${site.name}?`;
        showModal(CONFIRM_ARCHIVE, {
            hideModal,
            handleArchive,
            message,
            archive: !site.isArchived
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: {
                sites,
                postSuccess,
                isFetching,
                error,
                deleteSuccess,
                postFailure
            },
            statsReducer: { stats, isFetching: fetchingStats }
        },
        shared: {
            mobileReducer: { onMobile }
        }
    },
    { match }
) => ({
    postSuccess,
    site: sites[match.params.id] || {},
    isFetching: isFetching || fetchingStats,
    error,
    stats,
    id: match.params.id,
    deleteSuccess,
    onMobile,
    postFailure
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteSite: id => dispatch(deleteSite(id)),
    archiveSite: (id, undo) => dispatch(archiveSite(id, undo))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SiteDetailsContainer)
);
