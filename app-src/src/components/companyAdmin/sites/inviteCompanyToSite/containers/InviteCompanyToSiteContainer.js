import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteCompanyToSite from '../presentational/InviteCompanyToSite';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';

class InviteCompanyToSiteContainer extends Component {
    render() {
        const { site } = this.props;

        return <InviteCompanyToSite siteName={site.name || ''} />;
    }

    componentDidMount = () => {
        const { siteID, fetchSingleSite } = this.props;
        fetchSingleSite(siteID);
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }, { match }) => ({
    siteID: match.params.id,
    site: sitesReducer.sites[match.params.id] || {}
});
const mapDispatchToProps = dispatch => ({
    fetchSingleSite: siteID => {
        dispatch(fetchSingleSite(siteID));
    }
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InviteCompanyToSiteContainer)
);
