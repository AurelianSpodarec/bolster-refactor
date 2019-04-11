import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

class DrawingBreadcrumbContainer extends Component {
    state = {
        siteName: '',
        siteID: 0,
        buildingName: '',
        buildingID: 0,
        floorName: '',
        floorID: 0
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
            {
                text: this.state.buildingName,
                link: `/company/buildings/${this.state.buildingID}`
            },
            {
                text: this.state.floorName,
                link: `/company/drawings/${this.state.floorID}`
            },
            { text: this.props.drawing.name }
        ];
        return (
            <Breadcrumb breadcrumbs={breadcrumbsArray}>
                {this.props.children}
            </Breadcrumb>
        );
    }

    _setDrawingDetails = () => {
        const { drawing, floors, sites, buildings } = this.props;

        this.setState({
            siteName:
                sites[buildings[floors[drawing.floorID].buildingID].siteID]
                    .name,
            siteID: buildings[floors[drawing.floorID].buildingID].siteID,
            buildingName: buildings[floors[drawing.floorID].buildingID].name,
            buildingID: floors[drawing.floorID].buildingID,
            floorName: floors[drawing.floorID].name,
            floorID: drawing.floorID
        });
    };

    componentDidMount = () => {
        const { sites, buildings } = this.props;

        if (Object.values(sites).length && Object.values(buildings).length) {
            this._setDrawingDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const {
            drawing,
            floors,
            buildings,
            fetchSingleSite,
            fetchSingleBuilding,
            fetchSingleFloor,
            sites
        } = this.props;

        if (!prevProps.drawing.id && !!drawing.id) {
            fetchSingleFloor(drawing.floorID);
        }

        if (
            !Object.values(prevProps.floors).length &&
            Object.values(floors).length
        ) {
            fetchSingleBuilding(floors[drawing.floorID].buildingID);
        }

        if (
            !Object.values(prevProps.buildings).length &&
            Object.values(buildings).length
        ) {
            fetchSingleSite(
                buildings[floors[drawing.floorID].buildingID].siteID
            );
        }
        if (
            !Object.values(prevProps.sites).length &&
            Object.values(sites).length
        ) {
            this._setDrawingDetails();
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { drawings },
            floorsReducer: { floors },
            buildingsReducer: { buildings },
            sitesReducer: { sites }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id] || {},
    floors: floors,
    buildings: buildings,
    sites: sites
});

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: buildingID => {
        return dispatch(fetchSingleBuilding(buildingID));
    },
    fetchSingleSite: siteID => {
        return dispatch(fetchSingleSite(siteID));
    },
    fetchSingleFloor: floorID => {
        return dispatch(fetchSingleFloor(floorID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingBreadcrumbContainer)
);
