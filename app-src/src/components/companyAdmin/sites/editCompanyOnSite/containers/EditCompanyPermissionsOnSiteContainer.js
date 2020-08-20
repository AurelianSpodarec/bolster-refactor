import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyPermissionsOnSite from '../presentational/EditCompanyPermissionsOnSite';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';

class EditCompanyPermissionsOnSiteContainer extends Component {
    render() {
        const { site } = this.props;

        return <EditCompanyPermissionsOnSite siteName={site.name || ''} />;
    }

    componentDidMount = () => {
        const { siteID, fetchSingleSite } = this.props;
        fetchSingleSite(siteID);
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }, { match }) => ({
    siteID: match.params.id,
    site: sitesReducer.sites[match.params.id] || {},
});

const mapDispatchToProps = { fetchSingleSite };
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyPermissionsOnSiteContainer),
);
