import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Stats from 'components/shared/stats/presentational/Stats';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SiteDetailsContainer extends Component {
    render() {
        const { site, error, isFetching } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!site.id}
            >
                <Stats details={site} />
            </BlockContainer>
        );
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
