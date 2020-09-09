import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyPermissionsOnSite from '../presentational/EditCompanyPermissionsOnSite';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchPermissionsForCompanyPermission from 'actions/companyAdmin/companiesPermissions/async/fetchPermissionsForCompanyPermission';

class EditCompanyPermissionsOnSiteContainer extends Component {
    render() {
        const { site } = this.props;

        return <EditCompanyPermissionsOnSite siteName={site.name || ''} />;
    }

    componentDidMount = () => {
        const {
            siteID,
            fetchSingleSite,
            fetchPermissionsForCompanyPermission,
            companyID,
        } = this.props;
        fetchSingleSite(siteID);
        fetchPermissionsForCompanyPermission('site', siteID, companyID);
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }, { match }) => ({
    siteID: match.params.id,
    site: sitesReducer.sites[match.params.id] || {},
    companyID: match.params.companyID,
});

const mapDispatchToProps = { fetchSingleSite, fetchPermissionsForCompanyPermission };
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyPermissionsOnSiteContainer),
);
