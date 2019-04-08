import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';

import InviteClientToSite from '../presentational/InviteClientToSite';

class InviteClientToSiteContainer extends Component {
    state = {
        siteName: ''
    };

    render() {
        return (
            <InviteClientToSite
                siteID={this.props.siteID}
                siteName={this.state.siteName}
            />
        );
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
        const { fetchSingleSite, siteID } = this.props;

        fetchSingleSite(siteID);

        if (siteID) {
            this._setSiteName();
        }
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }, ownProps) => ({
    siteID: ownProps.match.params.id,
    site: sitesReducer.sites[ownProps.match.params.id] || {}
});

const mapDispatchToProps = dispatch => ({
    fetchSingleSite: siteID => {
        dispatch(fetchSingleSite(siteID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteClientToSiteContainer);
