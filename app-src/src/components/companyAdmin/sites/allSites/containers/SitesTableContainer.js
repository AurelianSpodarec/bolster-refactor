import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import setHierarchyIsSorting from 'actions/companyAdmin/hierarchy/sync/setHierarchyIsSorting';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import postSitesSort from 'actions/companyAdmin/sites/async/postSitesSort';

import { ACCESS_TYPES_VALUES, DEFAULT_SITES_SORT } from 'constants/companyAdmin/enums';
import { TABLE_SORT_DIRECTIONS } from 'constants/shared/tables';
import { hierarchySort } from 'helpers/generic';
import { formatPermissions } from './SitesListItemContainer';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import SitesTable from '../presentational/SitesTable';

const { ASC, DESC } = TABLE_SORT_DIRECTIONS;
const columnNames = ['Site name', 'Client', 'Created on', 'Owned by', 'Permissions', ''];

const nameSortFunc = (a, b) => a.name.localeCompare(b.name);
const dateSortFunc = (a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
class SitesTableContainer extends Component {
    state = {
        sortFunc: null,
        sortDirection: null,
        sortName: null,
    };

    render() {
        const { sortDirection, sortName } = this.state;
        const { isFetching, error, isSorting } = this.props;

        const columns = [
            {
                key: 1,
                name: columnNames[0],
                onClick: () => {
                    this.updateSortFunc(nameSortFunc, columnNames[0]);
                },
            },
            {
                key: 2,
                name: columnNames[1],
                onClick: () => {
                    const sortFunc = (a, b) => a.client.localeCompare(b.client);
                    this.updateSortFunc(sortFunc, columnNames[1]);
                },
            },
            {
                key: 3,
                name: columnNames[2],
                onClick: () => {
                    this.updateSortFunc(dateSortFunc, columnNames[2]);
                },
            },
            {
                key: 4,
                name: columnNames[3],
                onClick: () => {
                    const sortFunc = (a, b) => a.ownerCompanyName.localeCompare(b.ownerCompanyName);
                    this.updateSortFunc(sortFunc, columnNames[3]);
                },
            },
            {
                key: 5,
                name: columnNames[4],
                onClick: () => {
                    const sortFunc = (a, b) => {
                        const aPermissions = formatPermissions(a.permissions, a.accessType);
                        const bPermissions = formatPermissions(b.permissions, b.accessType);

                        return aPermissions.localeCompare(bPermissions);
                    };
                    this.updateSortFunc(sortFunc, columnNames[4]);
                },
            },
            {
                key: 6,
                name: columnNames[5],
                onClick: null,
            },
        ];

        return (
            <SitesTable
                isSorting={isSorting}
                headers={columns}
                items={this._getFilteredSites()}
                isFetching={isFetching}
                error={error}
                postSitesSort={this.postSitesSort}
                sortDirection={sortDirection}
                sortName={sortName}
            />
        );
    }

    componentDidMount = () => {
        const { setHierarchyIsSorting, filters } = this.props;
        setHierarchyIsSorting(false);

        // update sort based on saved filters
        const { sortBy } = filters;
        const { DATE_ASC, DATE_DESC, NAME_ASC, NAME_DESC } = DEFAULT_SITES_SORT;

        switch (sortBy) {
            case DATE_ASC:
                this.setState({
                    sortFunc: dateSortFunc,
                    sortDirection: ASC,
                    sortName: columnNames[2],
                });
                break;
            case DATE_DESC:
                this.setState({
                    sortFunc: dateSortFunc,
                    sortDirection: DESC,
                    sortName: columnNames[2],
                });
                break;
            case NAME_ASC:
                this.setState({
                    sortFunc: nameSortFunc,
                    sortDirection: ASC,
                    sortName: columnNames[0],
                });
                break;
            case NAME_DESC:
                this.setState({
                    sortFunc: nameSortFunc,
                    sortDirection: DESC,
                    sortName: columnNames[0],
                });
                break;
        }
    };

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
        const { sites, filters, isSorting } = this.props;

        if (isSorting) return this._getSortedSites(sites);

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
        const { sortFunc, sortDirection } = this.state;
        const {
            isSorting,
            filters: { sortBy },
        } = this.props;
        const { DATE_ASC, DATE_DESC, NAME_ASC, NAME_DESC } = DEFAULT_SITES_SORT;
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
        if (isSorting) return sites.sort(hierarchySort);

        if (sortFunc) {
            if (sortDirection === DESC) {
                return sites.sort(sortFunc).reverse();
            }

            return sites.sort(sortFunc);
        }

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

    postSitesSort = () => {
        this.props.postSitesSort(this.props.sites);
    };

    // update sort based on column and current sort direction
    updateSortFunc = (sort, name) => {
        const { sortDirection } = this.state;

        if (sortDirection === ASC) {
            this.setState({ sortFunc: sort, sortDirection: DESC, sortName: name });
            return;
        }

        if (sortDirection === DESC) {
            this.setState({ sortFunc: null, sortDirection: null, sortName: null });
            return;
        }

        this.setState({ sortFunc: sort, sortDirection: ASC, sortName: name });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites, isFetching, error, postSuccess, updatedSiteID },
        hierarchyReducer: { isSorting },
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
    isSorting,
});
const mapDispatchToProps = {
    showModal,
    hideModal,
    updateHierarchyAddState,
    postSitesSort,
    setHierarchyIsSorting,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SitesTableContainer));
