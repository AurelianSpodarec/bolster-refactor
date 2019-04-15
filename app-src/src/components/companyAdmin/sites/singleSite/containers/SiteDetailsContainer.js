import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SiteStats from '../presentational/SiteStats';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_DELETE, ERROR_MODAL } from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteSite from 'actions/companyAdmin/sites/async/deleteSite';

class SiteDetailsContainer extends Component {
    render() {
        const { site, error, isFetching, stats } = this.props;

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
            hideModal
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push('/company/sites');
        }
        if (postFailure && !prevProps.postFailure) showModal(ERROR_MODAL);
    };

    handleDeleteModal = () => {
        const { id, showModal, hideModal, site, deleteSite } = this.props;
        const handleDelete = () => deleteSite(id);
        const message = `Are you sure you want to delete ${site.name}?`;
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: {
                sites,
                isFetching,
                error,
                deleteSuccess,
                postFailure
            },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    site: sites[match.params.id] || {},
    isFetching: isFetching || fetchingStats,
    error,
    stats,
    id: match.params.id,
    deleteSuccess,
    postFailure
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteSite: id => dispatch(deleteSite(id))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SiteDetailsContainer)
);
