import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

class PinSingleBreadCrumbContainer extends Component {
    render() {
        const { site, building, floor, drawing, pin, isFetching } = this.props;
        const breadcrumbsArray = [
            {
                text: 'Sites',
                link: '/company/sites/'
            },
            {
                text: site.name,
                link: `/company/sites/${site.id}`
            },
            {
                text: building.name,
                link: `/company/buildings/${building.id}`
            },
            {
                text: floor.name,
                link: `/company/floors/${floor.id}`
            },
            { text: drawing.name, link: `/company/drawings/${pin.drawingID}` },
            { text: `Pin ${pin.pinCode}` }
        ];
        return (
            <Breadcrumb
                breadcrumbs={
                    !isFetching ? breadcrumbsArray : [{ text: 'Loading...' }]
                }
            >
                {this.props.children}
            </Breadcrumb>
        );
    }

    componentDidMount() {
        const { pin } = this.props;
        if (pin.drawingID) {
            this.fetchData();
        }
    }
    componentDidUpdate(prevProps) {
        const { pin } = this.props;
        if (pin.drawingID && !prevProps.pin.drawingID) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {
            pin,
            fetchSingleFloor,
            fetchSingleBuilding,
            fetchSingleSite,
            fetchSingleDrawing
        } = this.props;
        fetchSingleDrawing(pin.drawingID)
            .then(({ payload }) => fetchSingleFloor(payload.floorID))
            .then(({ payload }) => fetchSingleBuilding(payload.buildingID))
            .then(({ payload }) => fetchSingleSite(payload.siteID));
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, isFetching: fetchingPins },
            drawingsReducer: { drawings, isFetching: fetchingDrawings },
            floorsReducer: { floors, isFetching: fetchingFloors },
            buildingsReducer: { buildings, isFetching: fetchingBuildings },
            sitesReducer: { sites, isFetching: fetchingSites }
        }
    },
    { match }
) => {
    const pin = pins[match.params.id] || {};
    const drawing = drawings[pin.drawingID] || {};
    const floor = floors[drawing.floorID] || {};
    const building = buildings[floor.buildingID] || {};
    const site = sites[building.siteID] || {};
    return {
        pin,
        drawing,
        floor,
        building,
        site,
        isFetching:
            fetchingPins ||
            fetchingDrawings ||
            fetchingFloors ||
            fetchingBuildings ||
            fetchingSites
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: buildingID => {
        return dispatch(fetchSingleBuilding(buildingID));
    },
    fetchSingleSite: siteID => {
        return dispatch(fetchSingleSite(siteID));
    },
    fetchSingleFloor: floorID => {
        return dispatch(fetchSingleFloor(floorID));
    },
    fetchSingleDrawing: drawingID => {
        return dispatch(fetchSingleDrawing(drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinSingleBreadCrumbContainer)
);
