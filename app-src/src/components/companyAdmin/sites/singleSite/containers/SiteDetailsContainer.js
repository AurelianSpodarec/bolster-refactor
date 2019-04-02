import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SiteStats from '../presentational/SiteStats';
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
                <SiteStats site={site} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }, { match }) => ({
    site: sitesReducer.sites[match.params.id] || {},
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(SiteDetailsContainer)
);
