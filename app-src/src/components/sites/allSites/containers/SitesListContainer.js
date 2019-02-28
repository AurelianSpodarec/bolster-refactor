import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSites from 'actions/sites/async/fetchSites';

import SitesList from '../presentational/SitesList';

class SitesListContainer extends Component {
    render() {
        const { sites, isFetching, error } = this.props;

        return (
            <SitesList sites={sites} isFetching={isFetching} error={error} />
        );
    }

    componentDidMount = () => {
        this.props.fetchSites();
    };
}

const mapStateToProps = ({ sitesReducers }) => ({
    sites: sitesReducers.sites.sites,
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
