import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleClientSite from 'actions/client/sites/async/clientFetchSingleSite';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

import { getSelectedCompanyForClient } from 'helpers/generic';

class BuildingBreadcrumbContainer extends Component {
    state = {
        siteName: '',
        siteID: 0
    };

    render() {
        const breadcrumbsArray = [
            {
                text: 'Sites',
                link: '/client/sites/'
            },
            {
                text: this.state.siteName,
                link: `/client/sites/${this.state.siteID}`
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
        const { building, fetchSingleClientSite } = this.props;

        if (!prevProps.building.id && !!building.id) {
            const selectedCompanyID = getSelectedCompanyForClient();

            fetchSingleClientSite(selectedCompanyID, building.siteID).then(
                () => {
                    this._setSiteDetails(building.siteID);
                }
            );
        }
    };
}

const mapStateToProps = (
    {
        client: {
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
    fetchSingleClientSite: (companyID, siteID) => {
        return dispatch(fetchSingleClientSite(companyID, siteID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingBreadcrumbContainer)
);
