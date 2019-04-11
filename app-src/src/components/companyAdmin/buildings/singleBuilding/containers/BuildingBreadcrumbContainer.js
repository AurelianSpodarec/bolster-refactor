import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

class BuildingBreadcrumbContainer extends Component {
    state = {
        siteName: '',
        siteID: 0
    };

    render() {
        const breadcrumbsArray = [
            {
                text: 'Sites',
                link: '/company/sites/'
            },
            {
                text: this.state.siteName,
                link: `/company/sites/${this.state.siteID}`
            },
            { text: this.props.building.name }
        ];
        return <Breadcrumb breadcrumbs={breadcrumbsArray} />;
    }

    _setSiteDetails = siteID => {
        const { sites } = this.props;

        const site = sites[siteID];

        this.setState({
            siteName: site.name,
            siteID: siteID
        });
    };

    componentDidMount = () => {
        const { sites, building } = this.props;

        if (Object.values(sites).length) {
            this._setSiteDetails(building.siteID);
        }
    };

    componentDidUpdate = prevProps => {
        const { building, fetchSingleSite } = this.props;

        if (!prevProps.building.id && !!building.id) {
            fetchSingleSite(building.siteID).then(() => {
                this._setSiteDetails(building.siteID);
            });
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: { buildings },
            sitesReducer: { sites }
        }
    },
    { match }
) => ({
    building: buildings[match.params.id] || {},
    sites: sites
});

const mapDispatchToProps = dispatch => ({
    fetchSingleSite: siteID => {
        return dispatch(fetchSingleSite(siteID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingBreadcrumbContainer)
);
