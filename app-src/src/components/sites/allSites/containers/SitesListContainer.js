import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSites from 'actions/sites/async/fetchAllSites';

import SitesTable from '../presentational/SitesTable';

class SitesListContainer extends Component {
    render() {
        const { sites, isFetching, error } = this.props;
        const tableHeaders = ['Site name', 'Owned by', 'Premissions', 'Action'];

        return (
            <SitesTable
                headers={tableHeaders}
                sites={sites}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchSites();
    };

    getFilteredSites = () => {
        const { sites, filters } = this.props;
        return sites
            .filter(site => site.name.includes(filters.name))
            .filter(site => site);
    };
}

const mapStateToProps = ({ sitesReducers }) => ({
    sites: Object.values(sitesReducers.sites.sites),
    isFetching: sitesReducers.sites.isFetching,
    error: sitesReducers.sites.error,
    filters: sitesReducers.sitesFilters
});

const mapDispatchToProps = dispatch => ({
    fetchSites: () => {
        dispatch(fetchSites());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SitesListContainer);
