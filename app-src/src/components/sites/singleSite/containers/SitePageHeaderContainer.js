import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

class SitePageHeaderContainer extends Component {
    render() {
        return (
            <PageHeading title={`Site: ${this.props.site.name}`}>
                <Link to="/site">Change Ownership</Link>
            </PageHeading>
        );
    }
}

export default withRouter(
    connect(({ sitesReducers }, ownProps) => ({
        site: sitesReducers.sites[ownProps.match.params.id] || {}
    }))(SitePageHeaderContainer)
);
