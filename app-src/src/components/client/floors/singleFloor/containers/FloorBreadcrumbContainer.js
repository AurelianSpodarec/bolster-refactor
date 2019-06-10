import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleClientSite from 'actions/client/sites/async/clientFetchSingleSite';
import fetchSingleClientBuilding from 'actions/client/buildings/async/clientFetchSingleBuilding';

import { getSelectedCompanyForClient } from 'helpers/generic';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

class FloorBreadcrumbContainer extends Component {
    state = {
        siteName: '',
        siteID: 0,
        buildingName: '',
        buildingID: 0
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
            {
                text: this.state.buildingName,
                link: `/client/buildings/${this.state.buildingID}`
            },
            { text: this.props.floor.name }
        ];
        return <Breadcrumb breadcrumbs={breadcrumbsArray} />;
    }

    _setFloorDetails = () => {
        const { floor, sites, buildings } = this.props;

        this.setState({
            siteName: sites[buildings[floor.buildingID].siteID].name,
            siteID: buildings[floor.buildingID].siteID,
            buildingName: buildings[floor.buildingID].name,
            buildingID: floor.buildingID
        });
    };
    _setSiteDetails = siteID => {
        const { sites } = this.props;

        const site = sites[siteID];

        this.setState({
            siteName: site.name,
            siteID: siteID
        });
    };
    _setBuildingDetails = buildingID => {
        const { buildings } = this.props;

        const building = buildings[buildingID];

        this.setState({
            buildingName: building.name,
            buildingID: buildingID
        });
    };

    componentDidMount = () => {
        const { sites, buildings, floor } = this.props;
        if (Object.values(sites).length) {
            this._setSiteDetails(floor.siteID);
        }
        if (Object.values(buildings).length) {
            this._setBuildingDetails(floor.buildingID);
        }
    };

    componentDidUpdate = prevProps => {
        const {
            floor,
            buildings,
            fetchSingleClientSite,
            fetchSingleClientBuilding
        } = this.props;

        if (!prevProps.floor.id && !!floor.id) {
            const selectedCompanyID = getSelectedCompanyForClient();

            fetchSingleClientBuilding(selectedCompanyID, floor.buildingID).then(
                () => {
                    this._setBuildingDetails(floor.buildingID);
                }
            );
        }
        if (
            !Object.values(prevProps.buildings).length &&
            Object.values(buildings).length
        ) {
            const selectedCompanyID = getSelectedCompanyForClient();

            fetchSingleClientSite(
                selectedCompanyID,
                buildings[floor.buildingID].siteID
            ).then(() => {
                this._setSiteDetails(buildings[floor.buildingID].siteID);
            });
        }
    };
}

const mapStateToProps = (
    {
        client: {
            floorsReducer: { floors },
            buildingsReducer: { buildings },
            sitesReducer: { sites }
        }
    },
    { match }
) => ({
    floor: floors[match.params.id] || {},
    buildings: buildings,
    sites: sites
});

const mapDispatchToProps = dispatch => ({
    fetchSingleClientSite: (companyID, siteID) => {
        return dispatch(fetchSingleClientSite(companyID, siteID));
    },
    fetchSingleClientBuilding: (companyID, buildingID) => {
        return dispatch(fetchSingleClientBuilding(companyID, buildingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FloorBreadcrumbContainer)
);
