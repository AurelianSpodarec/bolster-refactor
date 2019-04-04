import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteCompanyToSite from '../presentational/InviteCompanyToSite';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';

class InviteCompanyToSiteContainer extends Component {
    state = {
        siteName: ''
    };

    render() {
        const { siteName } = this.state;

        return <InviteCompanyToSite title={siteName} />;
    }

    _setSiteName = () => {
        const { site } = this.props;

        this.setState({
            siteName: site.name
        });
    };

    componentDidUpdate = prevProps => {
        const { site } = this.props;

        if (!prevProps.site.id && !!site.id) {
            this._setSiteName();
        }
    };

    componentDidMount = () => {
        const { siteID, site, fetchSingleSite } = this.props;

        fetchSingleSite(siteID);

        if (site.id) {
            this._setSiteName();
        }
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
