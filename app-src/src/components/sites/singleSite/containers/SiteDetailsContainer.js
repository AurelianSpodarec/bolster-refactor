import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Stats from 'components/shared/stats/presentational/Stats';

class SiteDetailsContainer extends Component {
    render() {
        const { site, isFetching } = this.props;

        return <Stats details={site} isFetching={isFetching} />;
    }
}

const mapStateToProps = ({ sitesReducer }, { match }) => ({
    site: sitesReducer.sites[match.params.id] || {},
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error
});

//if details is empty output loading

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(SiteDetailsContainer)
);
