import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSites from 'actions/sites/async/fetchSites';

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
}

const mapStateToProps = ({ sitesReducers }) => ({
    sites: Object.values(sitesReducers.sites.sites),
    isFetching: sitesReducers.sites.isFetching,
    error: sitesReducers.sites.error,
    searchTerm: sitesReducers.sitesFilters.searchTerm,
    status: sitesReducers.sitesFilters.status
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
