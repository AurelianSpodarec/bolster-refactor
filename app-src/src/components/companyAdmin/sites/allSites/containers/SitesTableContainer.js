import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

import { ADD_SITE, ERROR_MODAL } from 'constants/shared/modalTypes';

import SitesTable from '../presentational/SitesTable';
import { hierarchySort } from 'helpers/generic';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';

class SitesTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;
        return (
            <SitesTable
                headers={[
                    'Site name',
                    'Created on',
                    'Owned by',
                    'Permissions',
                    'Action'
                ]}
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
            updatedSiteID,
            history,
            updateHierarchyAddState
        } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
            updateHierarchyAddState(true);
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    'There was an error processing your request, please try again later.'
            });
        }
    };

    _getFilteredSites = () => {
        const { sites, filters } = this.props;
        const { status } = filters;
        const name = filters.name.toLowerCase();

        let sitesSearched = sites.filter(site =>
            site.name.toLowerCase().includes(name)
        );

        if (status === 'active') {
            return sitesSearched.filter(site => !site.isArchived);
        }

        if (status === 'read only') {
            return sitesSearched.filter(
                site => site.accessType === ACCESS_TYPES_VALUES.READONLY
            );
        }

        if (status === 'archived') {
            return sitesSearched.filter(site => site.isArchived);
        }

        return sitesSearched.filter(site => !site.isArchived);
    };

    handleAddSite = () => {
        this.props.showModal(ADD_SITE);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites, isFetching, error, postSuccess, updatedSiteID }
    },
    shared: {
        sitesFilterReducer: { filters }
    }
}) => ({
    sites: Object.values(sites).sort(hierarchySort),
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
    },
    updateHierarchyAddState: value => {
        dispatch(updateHierarchyAddState(value));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SitesTableContainer)
);
