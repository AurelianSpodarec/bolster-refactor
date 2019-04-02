import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleSite from 'actions/sites/async/fetchSingleSite';

import SiteEdit from '../presentational/SiteEdit';

class SiteEditContainer extends Component {
    state = {
        siteName: ''
    };

    render() {
        return <SiteEdit siteName={this.state.siteName} />;
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
    };
}

const mapStateToProps = ({ sitesReducer }, ownProps) => ({
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
)(SiteEditContainer);
