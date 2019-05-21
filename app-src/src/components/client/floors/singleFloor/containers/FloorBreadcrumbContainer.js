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

    componentDidMount = () => {
        const { sites, buildings } = this.props;

        if (Object.values(sites).length && Object.values(buildings).length) {
            this._setFloorDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const {
            floor,
            buildings,
            fetchSingleSite,
            fetchSingleBuilding,
            sites
        } = this.props;

        if (!prevProps.floor.id && !!floor.id) {
            fetchSingleBuilding(floor.buildingID);
        }

        if (
            !Object.values(prevProps.buildings).length &&
            Object.values(buildings).length
        ) {
            fetchSingleSite(buildings[floor.buildingID].siteID);
        }
        if (
            !Object.values(prevProps.sites).length &&
            Object.values(sites).length
        ) {
            this._setFloorDetails();
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
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
    fetchSingleBuilding: buildingID => {
        return dispatch(fetchSingleBuilding(buildingID));
    },
    fetchSingleSite: siteID => {
        return dispatch(fetchSingleSite(siteID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FloorBreadcrumbContainer)
);
