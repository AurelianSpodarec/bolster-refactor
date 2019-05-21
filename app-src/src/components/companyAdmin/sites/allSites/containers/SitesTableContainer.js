import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import {
    ADD_SITE,
    SUCCESS_MODAL,
    ERROR_MODAL
} from 'constants/shared/modalTypes';

import SitesTable from '../presentational/SitesTable';

class SitesTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;
        return (
            <SitesTable
                headers={['Site name', 'Owned by', 'Permissions', 'Action']}
                sites={this._getFilteredSites()}
                isFetching={isFetching}
                error={error}
                handleAddSite={this.handleAddSite}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            showModal,
            hideModal,
            error,
            updatedSiteID
        } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Site added successfully.',
                link: `/company/sites/${updatedSiteID}`,
                linkMessage: 'View'
            });
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    '##There was an error processing your request, please try again later.##'
            });
        }
    };

    _getFilteredSites = () => {
        const { sites, filters } = this.props;
        const { status } = filters;
        const name = filters.name.toLowerCase();

        return sites
            .filter(site => site.name.toLowerCase().includes(name))
            .filter(
                ({ accessType }) =>
                    !status.length || status + '' === accessType + ''
            );
    };

    handleAddSite = () => {
        this.props.showModal(ADD_SITE);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: {
            sites,
            isFetching,
            error,
            filters,
            postSuccess,
            updatedSiteID
        }
    }
}) => ({
    sites: Object.values(sites),
    isFetching,
    error,
    filters,
    postSuccess,
    updatedSiteID
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SitesTableContainer)
);
