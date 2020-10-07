import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { ACCESS_TYPES_VALUES, DEFAULT_SITES_SORT } from 'constants/companyAdmin/enums';

import { ADD_SITE, ERROR_MODAL } from 'constants/shared/modalTypes';

import SitesTable from '../presentational/SitesTable';
import { hierarchySort } from 'helpers/generic';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';

class SitesTableContainer extends Component {
    state = {
        isSortingSites: false,
    };

    render() {
        const { isSortingSites } = this.state;
        const { isFetching, error } = this.props;
        return (
            <SitesTable
                isSortingSites={isSortingSites}
                headers={['Site name', 'Client', 'Created on', 'Owned by', 'Permissions', '']}
                items={this._getFilteredSites()}
                isFetching={isFetching}
                error={error}
                handleAddSite={this.handleAddSite}
                toggleIsSortingSites={this.toggleIsSortingSites}
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
            updateHierarchyAddState,
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
                    'There was an error processing your request, please try again later.',
            });
        }
    };

    _getFilteredSites = () => {
        const { sites, filters } = this.props;
        const { isSortingSites } = this.state;

        if (isSortingSites) return this._getSortedSites(sites);

        const { status } = filters;
        const name = filters.name.toLowerCase();

        const sitesSearched = sites.filter(site => site.name.toLowerCase().includes(name));

        const sitesSorted = this._getSortedSites(sitesSearched);

        if (status === 'active') {
            return sitesSorted.filter(site => !site.isArchived);
        }

        if (status === 'read only') {
            return sitesSorted.filter(site => site.accessType === ACCESS_TYPES_VALUES.READONLY);
        }

        if (status === 'archived') {
            return sitesSorted.filter(site => site.isArchived);
        }

        return sitesSorted;
    };

    _getSortedSites = sites => {
        const { isSortingSites } = this.state;
        const {
            filters: { sortBy },
        } = this.props;
        const { CUSTOM, DATE_ASC, DATE_DESC, NAME_ASC, NAME_DESC } = DEFAULT_SITES_SORT;
        const dateKeys = [DATE_DESC, DATE_ASC];
        const nameKeys = [NAME_ASC, NAME_DESC];
        // eslint-disable-next-line
        const ascKeys = [DATE_ASC, NAME_ASC];
        const descKeys = [DATE_DESC, NAME_DESC];
        const key = nameKeys.includes(+sortBy)
            ? 'name'
            : dateKeys.includes(+sortBy)
            ? 'createdOn'
            : 'sort';
        const order = descKeys.includes(+sortBy) ? 'desc' : 'asc';

        // default sort order as per api
        if (+sortBy === CUSTOM || isSortingSites) return sites.sort(hierarchySort);

        if (order === 'desc') {
            if (key === 'createdOn') {
                return sites.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
            } else {
                return sites.sort((a, b) => (b[key] > a[key] ? 1 : b[key] < a[key] ? -1 : 0));
            }
        }

        if (order === 'asc') {
            if (key === 'createdOn') {
                return sites.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
            } else {
                return sites.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
            }
        }
    };

    toggleIsSortingSites = e => {
        e.preventDefault();

        const { updateSitesFilters } = this.props;
        updateSitesFilters('name', '');
        updateSitesFilters('status', '');
        updateSitesFilters('sortBy', DEFAULT_SITES_SORT.CUSTOM);
        this.setState(prev => ({ isSortingSites: !prev.isSortingSites }));
    };

    handleAddSite = () => {
        this.props.showModal(ADD_SITE);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites, isFetching, error, postSuccess, updatedSiteID },
    },
    shared: {
        sitesFilterReducer: { filters },
    },
}) => ({
    sites: Object.values(sites),
    isFetching,
    error,
    filters,
    postSuccess,
    updatedSiteID,
});

const mapDispatchToProps = { showModal, hideModal, updateHierarchyAddState, updateSitesFilters };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SitesTableContainer));
