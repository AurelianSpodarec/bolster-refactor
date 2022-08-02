import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

class FloorBreadcrumbContainer extends Component {
    state = {
        siteName: '',
        siteID: 0,
        buildingName: '',
        buildingID: 0,
        hasSetDetails: false,
    };

    render() {
        const breadcrumbsArray = [
            {
                text: 'Sites',
                link: '/company/sites/',
            },
            {
                text: this.state.siteName,
                link: `/company/sites/${this.state.siteID}`,
            },
            {
                text: this.state.buildingName,
                link: `/company/buildings/${this.state.buildingID}`,
            },
            { text: this.props.floor.name },
        ];
        return <Breadcrumb breadcrumbs={breadcrumbsArray}>{this.props.children}</Breadcrumb>;
    }

    _setFloorDetails = () => {
        const { floor, sites, buildings } = this.props;

        this.setState({
            siteName: sites[buildings[floor.buildingID].siteID].name,
            siteID: buildings[floor.buildingID].siteID,
            buildingName: buildings[floor.buildingID].name,
            buildingID: floor.buildingID,
        });
    };

    componentDidMount = () => {
        const { sites, buildings, floor } = this.props;
        if (
            Object.values(sites).length &&
            Object.values(buildings).length &&
            Object.values(floor).length
        ) {
            this._setFloorDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const { floor, buildings, fetchSingleSite, fetchSingleBuilding, sites } = this.props;
        const isFloorFetched = !prevProps.floor.id && !!floor.id;
        if (isFloorFetched && !buildings[floor.buildingID]) {
            fetchSingleBuilding(floor.buildingID);
        }
        const isBuildingFetched =
            !prevProps.buildings[floor.buildingID] && buildings[floor.buildingID];
        if (isBuildingFetched && !sites[buildings[floor.buildingID].siteID]) {
            fetchSingleSite(buildings[floor.buildingID].siteID);
        }
        const isSiteFetched =
            !prevProps.sites[buildings[floor.buildingID]?.siteID] &&
            sites[buildings[floor.buildingID]?.siteID];
        const hasAll =
            floor.id && buildings[floor.buildingID] && sites[buildings[floor.buildingID].siteID];
        if (isFloorFetched || isBuildingFetched || isSiteFetched) {
            if (hasAll) this._setFloorDetails();
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: { floors },
            buildingsReducer: { buildings },
            sitesReducer: { sites },
        },
    },
    { match },
) => ({
    floor: floors[match.params.id] || {},
    buildings: buildings,
    sites: sites,
});

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: buildingID => {
        return dispatch(fetchSingleBuilding(buildingID));
    },
    fetchSingleSite: siteID => {
        return dispatch(fetchSingleSite(siteID));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FloorBreadcrumbContainer));
